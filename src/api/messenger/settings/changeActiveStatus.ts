import { IMqttConnectOptions } from "../../../types";
import { MqttClient } from "mqtt";

export = (client: MqttClient, options: IMqttConnectOptions) => async function changeActiveStatus(value: boolean): Promise<boolean> {
  return false
}
