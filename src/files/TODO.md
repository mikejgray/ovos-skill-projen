# Mycroft Skill to OVOS Skill Modernization Checklist

- [ ] Replace `MycroftSkill` with `OVOSSkill`
- [ ] Replace `intent_handler` import
- [ ] Replace all over Mycroft imports with `ovos_workshop` and `ovos_util` equivalents
- [ ] Don't pass `name=...` parameter to super()
- [ ] For super init, use `*args, **kwargs`
- [ ] `initialize()` code can be moved to `__init__()` after the `super()__init__(*args, **kwargs)` call is made
- [ ] Should remove `create_skill()` function since OVOS doesn't use it
