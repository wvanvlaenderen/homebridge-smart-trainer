import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  HAP,
  Logging,
  Service,
} from "homebridge";
import { CyclingService } from "./cycling.service";

let hap: HAP;

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("SmartTrainer", SmartTrainer);
};

class SmartTrainer implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly name: string;

  private readonly sensorService: Service;
  private readonly cyclingService: CyclingService;

  constructor(log: Logging, config: AccessoryConfig, api: API) {
    this.log = log;
    this.name = config.name || "Trainer";
    this.cyclingService = new CyclingService(log);

    this.sensorService = new hap.Service.ContactSensor(this.name);

    this.cyclingService.isCycling$().subscribe(state => {
      this.sensorService.updateCharacteristic(
        hap.Characteristic.ContactSensorState,
        state,
      );
    });

    log.info("Smart trainer finished initializing!");
  }

  public getServices(): Service[] {
    return [this.sensorService];
  }
}
