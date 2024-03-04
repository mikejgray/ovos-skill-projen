from ovos_bus_client import Message
from ovos_plugin_manager.phal import PHALPlugin


class HelloWorldPlugin(PHALPlugin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.bus.on("mycroft.ready", self.on_mycroft_ready)

    @property
    def my_setting(self):
        """Dynamically get the my_setting from the config file(s).
        Example:
        {
            "PHAL": {
                "ovos-phal-plugin-helloworld": {
                    "my_setting": "my_value"
                }
            }
        }
        If it doesn't exist, return the default value.
        """
        return self.config.get("my_setting", "default_value")

    def on_mycroft_ready(self, message: Message):
        """Take action when OVOS is ready."""
        self.log.info("OVOS reported ready, now I can do something!")
        # Implement something here
