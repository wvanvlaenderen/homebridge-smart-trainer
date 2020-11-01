import { ReplaySubject } from "rxjs";
import { Logging } from "homebridge";

import noble from "noble-mac";

const SERVICE_CYLING_POWER_SERVICE = "1818";
const CHARACTERISTIC_CYLING_POWER_MEASUREMENT = "2a63";

export class CyclingService {
  private readonly isCycling = new ReplaySubject<boolean>(10);

  constructor(private log: Logging) {
    noble.on("stateChange", (state: any) => {
      if (state === "poweredOn") {
        noble.startScanning([SERVICE_CYLING_POWER_SERVICE]);
      } else {
        noble.stopScanning();
      }
    });

    noble.on("discover", (peripheral: any) => {
      const trainerName = peripheral.advertisement.localName;
      this.log.info("Found trainer", trainerName);

      peripheral.connect((error: any) => {
        if (error) {
          this.log("Could not connect to trainer", trainerName, error);
        }

        peripheral.discoverSomeServicesAndCharacteristics(
          [SERVICE_CYLING_POWER_SERVICE],
          [CHARACTERISTIC_CYLING_POWER_MEASUREMENT],
          this.onCharacteristicsDiscovered(trainerName),
        );
      });
    });
  }

  public isCycling$ = () => this.isCycling.asObservable();

  private onCharacteristicsDiscovered = (trainerName: string) => (
    error: any,
    services: any,
    characteristics: any,
  ) => {
    if (error) {
      this.log(
        "Could not discover characteristics for trainer",
        trainerName,
        error,
      );
    }

    characteristics.forEach((characteristic: any) => {
      characteristic.on("data", (data: any) => {
        const buffer = Buffer.from(data, "base64");
        const instantPower = buffer.readUInt16BE(1);
        this.isCycling.next(instantPower > 0);
      });

      characteristic.subscribe((e: any) => {
        if (e) {
          this.log("Error subscribing to characteristic", e);
        } else {
          this.log.debug("Subscribed to characteristic notifications");
        }
      });
    });
  };
}
