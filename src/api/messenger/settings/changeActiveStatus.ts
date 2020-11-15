import { IMqtt } from "../../../@types";
import { MqttClient } from "mqtt";

export = (client: MqttClient, options: IMqtt.ConnectOptions) => async function changeActiveStatus(value: boolean): Promise<boolean> {
  return false
}
