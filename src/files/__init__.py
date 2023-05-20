from ovos_utils import classproperty
from ovos_utils.intents import IntentBuilder
from ovos_utils.process_utils import RuntimeRequirements
from ovos_workshop.decorators import intent_handler
from ovos_workshop.skills import OVOSSkill


class HelloWorldSkill(OVOSSkill):
    def __init__(self, *args, **kwargs):
        """The __init__ method is called when the Skill is first constructed.
        Note that self.bus, self.skill_id, self.settings, and
        other base class settings are only available after the call to super().

        This is a good place to load and pre-process any data needed by your
        Skill, ideally after the super() call.
        """
        super().__init__(*args, **kwargs)
        self.learning = True

    @classproperty
    def runtime_requirements(self):
        return RuntimeRequirements(
            internet_before_load=False,
            network_before_load=False,
            gui_before_load=False,
            requires_internet=False,
            requires_network=False,
            requires_gui=False,
            no_internet_fallback=True,
            no_network_fallback=True,
            no_gui_fallback=True,
        )

    @property
    def get_my_setting(self):
        """Dynamically get the my_setting from the skill settings file.
        If it doesn't exist, return the default value.
        This will reflect live changes to settings.json files (local or from backend)
        """
        return self.settings.get("my_setting", "default_value")

    @intent_handler("HowAreYou.intent")
    def handle_how_are_you_intent(self, message):
        """This is a Padatious intent handler.
        It is triggered using a list of sample phrases."""
        self.speak_dialog("hello.world")

    @intent_handler(IntentBuilder("HelloWorldIntent").require("HelloWorldKeyword"))
    def handle_hello_world_intent(self, message):
        """This is an Adapt intent handler, it is triggered by a keyword.
        Skills can log useful information. These will appear in the CLI and
        the skills.log file."""
        self.log.info("There are five types of log messages: " "info, debug, warning, error, and exception.")
        self.speak_dialog("hello.world")

    @intent_handler(IntentBuilder("RoboticsLawsIntent").require("LawKeyword").build())
    def handle_robotic_laws_intent(self, message):
        """This is an Adapt intent handler, but using a RegEx intent."""
        # Optionally, get the RegEx group from the intent message
        # law = str(message.data.get("LawOfRobotics", "all"))
        self.speak_dialog("robotics")

    def stop(self):
        """Optional action to take when "stop" is requested by the user.
        This method should return True if it stopped something or
        False (or None) otherwise.
        If not relevant to your skill, feel free to remove.
        """
        return
