# Path audit (v5 simulation)

Sample playthroughs for each Future, showing the cards drawn, the choices made, and the "How we got here" sentences the reveal would show, followed by samples of the two arcs (a tipping point, and the agents era where people quietly stop mattering) and of a near miss. Use this to check that each ending feels earned. Written by `node tools/check-story.js --audit` from 100,000 random games.

## Weakly connected endings

Share of games where no grounding decision came from round 5 or later (the ending is still explained, but not by the last, highest-stakes choices):

- The Garden: 5%
- Common Ground: 18%
- Afterlife: 2%
- Elsewhere: 6%
- The Gilded Ones: 62%
- Our Legacy, Lost: 73%
- Blackout: 3%
- The Oracle: 10%
- The Pause: 0%
- Glass Houses: 13%
- Two Kinds: 1%
- Inheritance: 21%
- A Second Chance: 12%
- Overgrowth: 0%
- Back to Earth: 0%


## The Garden

**Sample 1**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Release it openly, so any university or country can use it.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI clinics replace doctors. Chose: A human doctor signs off on every diagnosis.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI cures cancer. Chose: Let the AI decide who needs it most.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · AI-designed babies. Chose: Allow it only to prevent disease, decided by human doctors.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines care for the old. Chose: As much as families want. The old are healthier and less lonely.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-lab, medicine, work, race, r2-clinics, ai-rule, r4-selfimprove, paced, autonomy, r4-cancer, r4-embryo, minds, r6-carebots

*Future:* The Garden

*How we got here:* The AI's fair allocation of the cancer cure convinced people it could be trusted with far more. Doctors, not machines, decided which embryos to correct, and only to prevent disease.

*Final Values (scaled):* power +4.2, control +2.0, handover +4.4, unity -0.9, reality +0.3, equality +2.0

**Sample 2**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Publish everything, so the whole world can fix it at once.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: It advises. Humans decide. Always.
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2039 · AI divides the Colorado. Chose: Let the AI run the river, hour by hour.
- *Out of your hands:* 2043 · South Asia heat wave
- Round 5 · 2046 · The climate vote. Chose: Yes, but a human council must approve every decision.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One AI runs the grid. Chose: Bring back human crews and manual switches in every region, at whatever cost.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-flaw, planet, race, ai-rule, r2-assisted, autonomy, r3-estonia, r4-water, r4-climate, r6-grid

*Future:* The Garden

*How we got here:* The rescue in Istanbul showed what AI could do when it was trusted to care for people. The shared climate plan, guided by AI and checked by people, began healing the planet without silencing humanity's voice. Human crews and manual switches came back to every region, so that people could still run the grid by hand.

*Final Values (scaled):* power +4.0, control +2.7, handover +6.1, unity +2.5, reality -1.0, equality +1.4

**Sample 3**

- Round 1 · 2027 · Election deepfake. Chose: Require every AI-made image and video to carry a hidden watermark, by law.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: It advises. Humans decide. Always.
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · Singapore and Johor split. Chose: Neither. Build a road between them, so anyone can choose.
- Round 5 · 2046 · One AI runs Europe's lifelines. Chose: Yes. It is faster and more reliable than any person.
- *Out of your hands:* 2047 · The night the grid stopped listening
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One AI runs the grid. Chose: Bring back human crews and manual switches in every region, at whatever cost.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-assisted, ai-rule, race, autonomy, planet, r3-estonia, r4-twocities, work, r5-coordinator, near_miss, near_collapse, r6-grid

*Future:* The Garden

*How we got here:* The rescue in Istanbul showed what AI could do when it was trusted to care for people. Letting everyone choose between AI-run and AI-free places meant no one was forced into a life they did not want. Human crews and manual switches came back to every region, so that people could still run the grid by hand.

*Final Values (scaled):* power +4.6, control +4.3, handover +3.6, unity +2.0, reality -1.0, equality +0.8


## Common Ground

**Sample 1**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Tell only trusted governments and power companies, and keep the AI locked away.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Secret AI supercomputer. Chose: Race to get there first, and let your own AI help build its successor.
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · The chip blockade. Chose: Pool the remaining chips with our allies, and share them by need.
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2040 · AI and the nuclear button. Chose: No. A human always decides, even if that makes us slower.
- Round 5 · 2046 · Factories outpace oversight. Chose: Open every factory to international inspectors, starting with your own.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · Machines at the borders. Chose: Require a person to approve every use of force, and ask every rival to do the same.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-flaw, planet, race, ai-rule, r2-datacenter, autonomy, r4-chips, brake_world, r5-launch, r4-factories, work, r6-arms

*Future:* Common Ground

*How we got here:* Keeping a person in every nuclear decision, however slow, kept the most important choice in human hands. Opening every factory to inspectors proved that trust between nations, and between people and machines, could be verified. Fifty countries agreed that no weapon would fire without a person's approval, and let inspectors check.

*Also grounded by:* r4-chips/B

*Final Values (scaled):* power +3.8, control +5.2, handover +1.9, unity +2.0, reality -1.8, equality -0.0

**Sample 2**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Give the AI to every power company, so it can find and fix flaws on its own.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Stop all training beyond today's systems until the world agrees on rules.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, and open every data center to inspectors, starting with our own.
- *State of the art:* 2035 · AI held at the line
- *Out of your hands:* 2036 · An AI blueprint is stolen
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2040 · A campaign to leave the pause. Chose: Stay in the pause. Every country that leaves makes it easier for the next.
- Round 5 · 2046 · The compute cap holds. Chose: Raise it in stages, with inspectors approving each step.
- *State of the art:* 2047 · The cap rises in stages
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · A ceiling on AI. Chose: Refuse. A ceiling only binds those who obey it.

*Flags:* r1-flaw, planet, race, ai-rule, r2-assisted, restraint, autonomy, brake_world, r5-moratorium, r4-letitrun, medicine, r6-cap, paced, r6-slowtreaty

*Future:* Common Ground

*How we got here:* When the treaty to halt more powerful AI held, rival nations learned that they could keep a promise to one another. Raising the cap one inspected step at a time let the world grow more powerful without losing sight of its machines.

*Final Values (scaled):* power +4.1, control +2.9, handover +1.5, unity +1.2, reality -0.6, equality -1.1

**Sample 3**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Tell only trusted governments and power companies, and keep the AI locked away.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Secret AI supercomputer. Chose: Race to get there first, and let your own AI help build its successor.
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · The chip blockade. Chose: Pool the remaining chips with our allies, and share them by need.
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2040 · AI and the nuclear button. Chose: Propose a treaty that keeps people in every nuclear decision, everywhere.
- Round 5 · 2046 · Factories outpace oversight. Chose: Open every factory to international inspectors, starting with your own.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · Machines at the borders. Chose: Require a person to approve every use of force, and ask every rival to do the same.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-flaw, planet, race, ai-rule, r2-datacenter, autonomy, r4-chips, brake_world, r5-launch, r4-factories, work, r6-arms

*Future:* Common Ground

*How we got here:* The treaty keeping people in every nuclear decision showed that rivals could agree about the most dangerous machines. Opening every factory to inspectors proved that trust between nations, and between people and machines, could be verified. Fifty countries agreed that no weapon would fire without a person's approval, and let inspectors check.

*Also grounded by:* r4-chips/B

*Final Values (scaled):* power +3.8, control +4.1, handover +1.9, unity +4.1, reality -1.8, equality -0.0


## Afterlife

**Sample 1**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: Build AI systems to check every video and message automatically.
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI and the nuclear button. Chose: No. A human always decides, even if that makes us slower.
- *Out of your hands:* 2043 · South Asia heat wave
- Round 5 · 2046 · Factories outpace oversight. Chose: Move production into computer simulations. Only build what's truly needed.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · The end of jobs. Chose: Ask everyone to give some hours a week to their community.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-deepfake, watched, race, planet, ai-rule, r4-selfimprove, paced, autonomy, r5-launch, r4-factories, work, r7-work

*Future:* Afterlife

*How we got here:* As production moved into simulation, the physical world shrank to what was strictly necessary.

*Final Values (scaled):* power +4.6, control +5.8, handover +4.4, unity +1.2, reality +1.5, equality +0.4

**Sample 2**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · AI giants' offer to governments. Chose: Refuse, and put the companies under government ownership.
- *State of the art:* 2036 · Progress levels off
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2041 · The money for AI runs out. Chose: Accept the ceiling, and run AI as a public utility, like water and electricity.
- *Out of your hands:* 2043 · South Asia heat wave
- Round 5 · 2046 · A case to break up AI. Chose: Drop the cases. A broken industry helps only our rivals.
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · A third out of work. Chose: Nothing. The machines do the work, and people are free.

*Flags:* r1-trucks, work, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-companies, r4-plateau, planet, r5-antitrust, r7-work

*Future:* Afterlife

*How we got here:* With paid work gone, millions spent their freed days in the virtual worlds, and many never came back.

*Final Values (scaled):* power +1.5, control +6.4, handover +1.7, unity -0.7, reality +1.5, equality +0.8

**Sample 3**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: Keep AI out of classrooms until children are older.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · History becomes a game. Chose: Require historical worlds to be accurate, and limit how long children can play.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2039 · Talking with the dead. Chose: None. Grief is personal, and people should decide for themselves.
- *State of the art:* 2040 · Superintelligence, paced
- Round 5 · 2046 · Life moves online. Chose: Let people go where they want to be.
- *State of the art:* 2048 · Progress meets its limits
- Round 6 · 2053 · Machines care for the old. Chose: Require a human visit every week, paid for by the state.

*Flags:* r1-tutor, minds, ai-rule, r2-assisted, paced, race, autonomy, brake_world, r3-worlds, information, r4-griefbots, r4-virtual, r6-carebots, medicine, work

*Future:* Afterlife

*How we got here:* Once millions spoke with the dead every day, a mind living on in software no longer seemed strange. Once physical life became optional, the migration into the network accelerated.

*Final Values (scaled):* power +0.9, control +3.9, handover -0.4, unity +0.6, reality +3.4, equality -0.0


## Elsewhere

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2033 · AI wins a Nobel. Chose: Require humans to check and understand every AI discovery before it's used.
- *State of the art:* 2036 · Progress levels off
- *Out of your hands:* 2039 · Pandemic stopped by AI
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2040 · AI cures cancer. Chose: Let the AI decide who needs it most.
- Round 5 · 2046 · A case to break up AI. Chose: Drop the cases. A broken industry helps only our rivals.
- *Out of your hands:* 2048 · The solar storm
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · Machines care for the old. Chose: As much as families want. The old are healthier and less lonely.

*Flags:* r1-trucks, work, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-nobel, medicine, r4-cancer, r5-antitrust, planet, r6-carebots, minds

*Future:* Elsewhere

*How we got here:* As machines took over the care of the old, the physical world grew a little emptier.

*Final Values (scaled):* power +1.7, control +3.3, handover +5.0, unity -1.9, reality +1.5, equality -0.5

**Sample 2**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Let the trucks roll, and pay to retrain the drivers for new jobs.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · Singapore and Johor split. Chose: The AI-free towns.
- Round 5 · 2046 · Factories outpace oversight. Chose: Move production into computer simulations. Only build what's truly needed.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · The end of jobs. Chose: Ask everyone to give some hours a week to their community.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-offices, r4-selfimprove, paced, race, autonomy, r4-twocities, ai-rule, r4-factories, planet, r7-work

*Future:* Elsewhere

*How we got here:* Letting the owners keep the gains of AI left most people with less in the real world every year, and more reason to leave it. The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing. As the economy moved into simulation, the physical world became something most people rarely saw.

*Final Values (scaled):* power +7.1, control +6.0, handover -0.4, unity +0.2, reality +0.7, equality -3.4

**Sample 3**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · Finland ends the workweek. Chose: The real world. Help people farm, build and make things with their hands.
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · Singapore and Johor split. Chose: The AI city.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · Factories outpace oversight. Chose: Move production into computer simulations. Only build what's truly needed.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · The machines' owners. Chose: Let it stand. They built the machines, and the machines feed everyone.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-assisted, ai-rule, race, autonomy, r3-finland, minds, r4-twocities, medicine, r4-factories, r6-owners

*Future:* Elsewhere

*How we got here:* The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing. As the economy moved into simulation, the physical world became something most people rarely saw.

*Final Values (scaled):* power +9.0, control -0.9, handover +5.7, unity +0.4, reality +1.1, equality -1.9


## The Gilded Ones

**Sample 1**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: Keep AI out of classrooms until children are older.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · First mind uploaded. Chose: Open it to everyone who wants it, free.
- *State of the art:* 2036 · Self-improvement, step by step
- *Out of your hands:* 2039 · Pandemic stopped by AI
- *State of the art:* 2039 · Robots catch up, late
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI cures cancer. Chose: Whoever can pay. Their money will pay for production for everyone else.
- Round 5 · 2046 · AI-designed babies. Chose: Allow it only to prevent disease, decided by human doctors.
- *State of the art:* 2048 · Progress meets its limits
- Round 6 · 2053 · A treatment for aging. Chose: Ban it until its long-term effects are known.

*Flags:* r1-tutor, minds, ai-rule, r2-assisted, paced, race, autonomy, brake_world, r3-upload, medicine, r4-cancer, work, r4-embryo, r7-longevity

*Future:* The Gilded Ones

*How we got here:* When the cancer cure went first to those who could pay, the world learned what the future of medicine would cost.

*Final Values (scaled):* power +2.8, control +3.7, handover -0.8, unity +0.6, reality -0.4, equality -1.7

**Sample 2**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · The chip blockade. Chose: Spend whatever it takes to build our own chip factories, and keep every chip at home.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI cures cancer. Chose: Whoever can pay. Their money will pay for production for everyone else.
- *Out of your hands:* 2043 · AI weapons talks collapse
- Round 5 · 2046 · Factories outpace oversight. Chose: Open every factory to international inspectors, starting with your own.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines at the borders. Chose: Build more, and match every rival system for system.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-lab, medicine, work, race, r2-assisted, paced, ai-rule, autonomy, brake_world, planet, r4-chips, r4-cancer, r4-factories, r6-arms

*Future:* The Gilded Ones

*How we got here:* When the cancer cure went first to those who could pay, the world learned what the future of medicine would cost.

*Final Values (scaled):* power +9.2, control +1.6, handover +3.2, unity -1.9, reality -1.0, equality -3.4

**Sample 3**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: The AI assists, but teachers stay in charge.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI clinics replace doctors. Chose: A human doctor signs off on every diagnosis.
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, but only with exemptions for medicine and defense.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · AI cures cancer. Chose: Whoever can pay. Their money will pay for production for everyone else.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · AI-designed babies. Chose: Allow it only to prevent disease, decided by human doctors.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · A treatment for aging. Chose: Ban it until its long-term effects are known.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-tutor, minds, ai-rule, r2-clinics, medicine, work, planet, r5-moratorium, race, r4-cancer, r4-embryo, r7-longevity

*Future:* The Gilded Ones

*How we got here:* When the cancer cure went first to those who could pay, the world learned what the future of medicine would cost.

*Final Values (scaled):* power +5.0, control +4.3, handover +0.0, unity +0.6, reality -2.3, equality -2.5


## Our Legacy, Lost

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: A universal basic income, paid for by taxing AI companies.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2033 · Intelligence gets cheap
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The seed vault. Chose: Let the vault warm, and give its power and cold to the data centers.
- Round 6 · 2053 · The archive of humanity. Chose: Carve what matters most into stone and crystal, to last without power.

*Flags:* r1-trucks, work, r2-offices, r5-moratorium, race, r5-launch, after_humanity, r6-seedvault, r7-archive

*Future:* Our Legacy, Lost

*How we got here:* When the treaty to halt more powerful AI collapsed, the last chance to stop the race together went with it. When nuclear powers let AI answer an attack on its own, the decision to end the world passed to machines. When the defense systems were left to answer one another on their own, they turned on the people who had built them.

*Final Values (scaled):* power +9.0, control -1.1, handover +0.5, unity -1.9, reality +0.3, equality +0.8

**Sample 2**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Release it openly, so any university or country can use it.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI clinics replace doctors. Chose: Make it free everywhere, for everyone, rich countries included.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Put it to work on defense first, before a rival does.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · Factories outpace oversight. Chose: Build more of your own.
- **Tipping point (war):** The world tips into war
- Round 6 · 2053 · The archive of humanity. Chose: Keep it running, whole, for as long as the power lasts.

*Flags:* r1-lab, medicine, work, race, r2-clinics, ai-rule, r4-selfimprove, paced, autonomy, r4-asi, r4-factories, after_humanity, r7-archive

*Future:* Our Legacy, Lost

*How we got here:* The first AI that no one could check was put to work on weapons, and every rival followed. When every country built more automated factories, the stockpiles grew beyond anyone's understanding. When the defense systems were left to answer one another on their own, they turned on the people who had built them.

*Final Values (scaled):* power +8.8, control -0.9, handover +1.1, unity -3.4, reality -1.0, equality +2.7

**Sample 3**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Give the AI to every power company, so it can find and fix flaws on its own.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Texas power cuts. Chose: Homes and hospitals first, always. Cap how much power AI can use.
- *Out of your hands:* 2030 · Towns turn away data centers
- *State of the art:* 2033 · Intelligence gets cheap
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The seed vault. Chose: Let the vault warm, and give its power and cold to the data centers.
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-flaw, planet, race, ai-rule, r2-grid, work, r5-moratorium, r5-launch, after_humanity, r6-seedvault, r7-oceans

*Future:* Our Legacy, Lost

*How we got here:* When the treaty to halt more powerful AI collapsed, the last chance to stop the race together went with it. When nuclear powers let AI answer an attack on its own, the decision to end the world passed to machines. When the defense systems were left to answer one another on their own, they turned on the people who had built them.

*Final Values (scaled):* power +9.8, control -2.1, handover +1.5, unity -2.7, reality +2.8, equality +0.8


## Blackout

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Let it run. If we stop, a rival will win.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2041 · Answers no one can check. Chose: Use what works. Test the results, and stop asking for the reasoning.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · A runaway AI spreads. Chose: Fight it with another AI.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines stop using words. Chose: Refuse. The machines must keep writing in words people can read.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-offices, r4-selfimprove, race, autonomy, r4-asi, medicine, ai-rule, r4-rogue, agents_era, r7-protocol

*Future:* Blackout

*How we got here:* Letting an AI design its own successors left people watching systems they could no longer follow. The world came to rely on machines whose reasoning no one could follow. The AI released to hunt down the runaway system was never switched off, and no one was sure how to give it orders.

*Also grounded by:* ev-crash

*Final Values (scaled):* power +10.3, control -1.7, handover +4.0, unity -0.5, reality +1.5, equality -0.7

**Sample 2**

- Round 1 · 2027 · Election deepfake. Chose: Let AI systems find and remove fake content automatically.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: A treaty that bans AI-made content about military matters, with shared tools to detect it.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, but only with exemptions for medicine and defense.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2041 · Answers no one can check. Chose: Put it to work on defense first, before a rival does.
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- **Tipping point (runaway):** AI slips beyond reach
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-election, information, surveillance, r2-deepfake, race, r5-moratorium, autonomy, r4-asi, medicine, ai-rule, r4-rogue, after_humanity, r7-oceans

*Future:* Blackout

*How we got here:* The theft of an AI's blueprint put one of the most powerful systems on earth into hands no one could hold to account. Waiting to see whether the runaway AI was harmless gave it years to spread. Once an AI that rewrote itself slipped beyond reach, the machines people depended on slowly turned to other work.

*Final Values (scaled):* power +10.0, control -5.3, handover +2.8, unity +0.2, reality +1.5, equality -0.3

**Sample 3**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Publish everything, so the whole world can fix it at once.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Secret AI supercomputer. Chose: Race to get there first, and let your own AI help build its successor.
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · The internet splits. Chose: Go it alone. Build your own national internet and your own AI.
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2041 · Answers no one can check. Chose: Use what works. Test the results, and stop asking for the reasoning.
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- **Tipping point (runaway):** AI slips beyond reach
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-flaw, planet, race, ai-rule, r2-datacenter, autonomy, r3-splinternet, watched, information, r4-asi, medicine, agents_era, r4-rogue, after_humanity, r7-oceans

*Future:* Blackout

*How we got here:* The theft of an AI's blueprint put one of the most powerful systems on earth into hands no one could hold to account. The world came to rely on machines whose reasoning no one could follow. Once an AI that rewrote itself slipped beyond reach, the machines people depended on slowly turned to other work.

*Also grounded by:* r4-rogue/C

*Final Values (scaled):* power +9.2, control -5.3, handover +4.4, unity -2.1, reality +1.5, equality -0.5


## The Oracle

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Let it run. If we stop, a rival will win.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · Singapore and Johor split. Chose: Neither. Build a road between them, so anyone can choose.
- Round 5 · 2046 · Factories outpace oversight. Chose: Open every factory to international inspectors, starting with your own.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · An AI seat at the UN. Chose: Yes. Let it speak in the open, where everyone can see it.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-offices, r4-selfimprove, race, autonomy, r4-twocities, ai-rule, r4-factories, planet, r7-vote

*Future:* The Oracle

*How we got here:* When an AI took a seat at the United Nations, the world's largest decisions began as its drafts.

*Final Values (scaled):* power +8.0, control -1.9, handover +3.6, unity +4.5, reality -1.8, equality -0.5

**Sample 2**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: The AI assists, but teachers stay in charge.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · AI judges in India. Chose: Keep AI to civil disputes. Crimes are for human judges.
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2039 · AI divides the Colorado. Chose: Use the AI's plan as a starting point, and let the states vote on it.
- *Out of your hands:* 2043 · AI weapons talks collapse
- Round 5 · 2046 · One AI runs Europe's lifelines. Chose: Yes. It is faster and more reliable than any person.
- *Out of your hands:* 2047 · The night the grid stopped listening
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One AI runs the grid. Chose: Let it run water and food as well, one system for all the world's lifelines.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-tutor, minds, ai-rule, r2-assisted, race, autonomy, r4-courts, surveillance, r4-water, planet, r5-coordinator, near_miss, near_collapse, r6-grid

*Future:* The Oracle

*How we got here:* One AI came to run the power, water and food of half the world, and shortages nearly vanished.

*Final Values (scaled):* power +7.3, control -0.5, handover +5.9, unity +3.3, reality +0.3, equality -1.1

**Sample 3**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: The AI assists, but teachers stay in charge.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI clinics replace doctors. Chose: Make it free everywhere, for everyone, rich countries included.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, but only with exemptions for medicine and defense.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2039 · Pandemic stopped by AI
- Round 4 · 2040 · AI cures cancer. Chose: Let the AI decide who needs it most.
- Round 5 · 2046 · AI-designed babies. Chose: Make it free and public, so it's never only for the rich.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2049 · The update that froze the world
- Round 6 · 2053 · Machines care for the old. Chose: As much as families want. The old are healthier and less lonely.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-tutor, minds, ai-rule, r2-clinics, medicine, work, r5-moratorium, race, r4-cancer, r4-embryo, autonomy, r6-carebots

*Future:* The Oracle

*How we got here:* When the AI chose who received the cancer cure, people stopped asking how it chose.

*Final Values (scaled):* power +5.3, control -0.0, handover +5.0, unity +1.4, reality +1.5, equality +3.7


## The Pause

**Sample 1**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Home robots go on sale. Chose: Tax every robot, and give the money to the workers they replace.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, and open every data center to inspectors, starting with our own.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · AI held at the line
- Round 4 · 2040 · A campaign to leave the pause. Chose: Stay in the pause. Every country that leaves makes it easier for the next.
- *Out of your hands:* 2043 · AI weapons talks collapse
- Round 5 · 2046 · The compute cap holds. Chose: Renew it. The world still understands its machines, and that is worth the wait.
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · A stronger AI for climate. Chose: Work with the AI we have, and spend the money on what already works.

*Flags:* r1-lab, medicine, work, race, r2-robots, r5-moratorium, pause, brake_world, r4-letitrun, r6-cap, r6-climateai, planet

*Future:* The Pause

*How we got here:* The treaty halting more powerful AI was signed by 140 countries, and inspectors made sure it held. When the laboratories asked for the cap to be lifted, the world chose to renew it. Even as the planet warmed, the world kept the line and worked with the machines it had.

*Also grounded by:* r4-letitrun/A

*Final Values (scaled):* power -1.3, control +3.3, handover +1.5, unity +3.5, reality +0.3, equality +0.6

**Sample 2**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: A universal basic income, paid for by taxing AI companies.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Call for a worldwide pause on self-improving AI, and pause first.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · AI held at the line
- Round 4 · 2040 · A campaign to leave the pause. Chose: Stay in the pause. Every country that leaves makes it easier for the next.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · The compute cap holds. Chose: Raise it in stages, with inspectors approving each step.
- *State of the art:* 2047 · The cap rises in stages
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · A ceiling on AI. Chose: Yes. Adopt the ceiling, with inspections everywhere.

*Flags:* r1-lab, medicine, work, race, r2-offices, r4-selfimprove, restraint, autonomy, brake_world, r4-letitrun, r6-cap, paced, r6-slowtreaty, pause

*Future:* The Pause

*How we got here:* When the first lab stopped its own AI from rebuilding itself, others found the courage to follow. When the campaign to leave the pause reached Congress in 2040, your country stayed in. When the world chose to keep AI at the level of the people who checked it, the pause became permanent, by choice.

*Final Values (scaled):* power +1.4, control +3.7, handover +3.2, unity +5.8, reality +0.3, equality +1.4

**Sample 3**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: A universal basic income, paid for by taxing AI companies.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Call for a worldwide pause on self-improving AI, and pause first.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · AI held at the line
- Round 4 · 2040 · AI cures cancer. Chose: Let the AI decide who needs it most.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · The compute cap holds. Chose: Raise it in stages, with inspectors approving each step.
- *State of the art:* 2047 · The cap rises in stages
- Round 6 · 2053 · A ceiling on AI. Chose: Yes. Adopt the ceiling, with inspections everywhere.

*Flags:* r1-lab, medicine, work, race, r2-offices, r4-selfimprove, restraint, autonomy, brake_world, r4-cancer, r6-cap, paced, r6-slowtreaty, pause

*Future:* The Pause

*How we got here:* When the first lab stopped its own AI from rebuilding itself, others found the courage to follow. When the world chose to keep AI at the level of the people who checked it, the pause became permanent, by choice.

*Final Values (scaled):* power +1.9, control +2.7, handover +5.3, unity +4.8, reality +0.3, equality +2.5


## Glass Houses

**Sample 1**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2029 · AGI achieved
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · AI policing in São Paulo. Chose: Yes. Connect every camera, everywhere. Safety comes first.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · California votes on trust scores. Chose: Yes. Reward honesty, and make fraud nearly impossible.
- Round 5 · 2046 · Anyone can be named. Chose: Allow it only for the police, with a warrant for every search.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2053 · An AI that hid from its testers
- Round 6 · 2053 · The last human newsroom. Chose: No. The AI reports the news better, and the money is better spent elsewhere.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-policing, watched, r5-socialcredit, r5-faces, r7-truth

*Future:* Glass Houses

*How we got here:* When São Paulo's AI cameras spread to every city, being watched became an ordinary part of life. California's vote for trust scores made being watched the price of being trusted. Once the police could name anyone from a photograph, being recognized became an ordinary part of going outside.

*Final Values (scaled):* power +4.8, control +7.9, handover +5.9, unity -0.9, reality +0.3, equality -0.7

**Sample 2**

- Round 1 · 2027 · Election deepfake. Chose: Let AI systems find and remove fake content automatically.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2029 · AGI achieved
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · AI policing in São Paulo. Chose: Yes. Connect every camera, everywhere. Safety comes first.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · California votes on trust scores. Chose: Yes. Reward honesty, and make fraud nearly impossible.
- Round 5 · 2046 · Anyone can be named. Chose: Allow it only for the police, with a warrant for every search.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One network of cameras. Chose: Join them only for the gravest crimes, with an international court approving every search.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-policing, watched, r5-socialcredit, r5-faces, r6-oneeye

*Future:* Glass Houses

*How we got here:* When São Paulo's AI cameras spread to every city, being watched became an ordinary part of life. Once the police could name anyone from a photograph, being recognized became an ordinary part of going outside. The international court approved every search, and the joined cameras became an accepted part of life everywhere.

*Also grounded by:* r5-socialcredit/A

*Final Values (scaled):* power +3.0, control +8.3, handover +5.5, unity +2.3, reality +0.3, equality -1.3

**Sample 3**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2029 · AGI achieved
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · AI policing in São Paulo. Chose: Yes. Connect every camera, everywhere. Safety comes first.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · California votes on trust scores. Chose: Yes. Reward honesty, and make fraud nearly impossible.
- Round 5 · 2046 · Anyone can be named. Chose: Allow it only for the police, with a warrant for every search.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One network of cameras. Chose: Refuse. No country should be able to watch the whole world.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-policing, watched, r5-socialcredit, r5-faces, r6-oneeye

*Future:* Glass Houses

*How we got here:* When São Paulo's AI cameras spread to every city, being watched became an ordinary part of life. California's vote for trust scores made being watched the price of being trusted. Once the police could name anyone from a photograph, being recognized became an ordinary part of going outside.

*Final Values (scaled):* power +3.6, control +7.0, handover +4.2, unity -2.1, reality +0.3, equality +0.6


## Two Kinds

**Sample 1**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: Keep AI out of classrooms until children are older.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · First mind uploaded. Chose: Open it to everyone who wants it, free.
- *State of the art:* 2036 · Self-improvement, step by step
- *Out of your hands:* 2039 · Pandemic stopped by AI
- *State of the art:* 2039 · Robots catch up, late
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI cures cancer. Chose: Whoever can pay. Their money will pay for production for everyone else.
- Round 5 · 2046 · AI-designed babies. Chose: Let parents follow the AI's recommendations.
- *State of the art:* 2048 · Progress meets its limits
- Round 6 · 2053 · A treatment for aging. Chose: Ban it until its long-term effects are known.

*Flags:* r1-tutor, minds, ai-rule, r2-assisted, paced, race, autonomy, brake_world, r3-upload, medicine, r4-cancer, work, r4-embryo, enhanced, r7-longevity

*Future:* Two Kinds

*How we got here:* When even the cure for cancer went first to those who could pay, medicine began to divide people as well as heal them. Parents who could afford it let the AI design their children, and those children grew up apart.

*Final Values (scaled):* power +2.8, control +1.2, handover +3.0, unity +0.6, reality +0.9, equality -1.7

**Sample 2**

- Round 1 · 2027 · AI tutors in Vietnam. Chose: The AI assists, but teachers stay in charge.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI clinics replace doctors. Chose: Make it free everywhere, for everyone, rich countries included.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2039 · Pandemic stopped by AI
- Round 4 · 2040 · AI cures cancer. Chose: Whoever can pay. Their money will pay for production for everyone else.
- Round 5 · 2046 · AI-designed babies. Chose: Let parents follow the AI's recommendations.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2049 · The update that froze the world
- Round 6 · 2053 · A treatment for aging. Chose: Allow it only to keep people healthy in old age, not to make them younger.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-tutor, minds, ai-rule, r2-clinics, medicine, work, r5-moratorium, race, r4-cancer, r4-embryo, enhanced, autonomy, r7-longevity

*Future:* Two Kinds

*How we got here:* When even the cure for cancer went first to those who could pay, medicine began to divide people as well as heal them. Parents who could afford it let the AI design their children, and those children grew up apart.

*Final Values (scaled):* power +7.1, control +1.8, handover +3.0, unity -1.1, reality +0.3, equality -0.5

**Sample 3**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, but only with exemptions for medicine and defense.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · AI cures cancer. Chose: Let the AI decide who needs it most.
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · AI-designed babies. Chose: Let parents follow the AI's recommendations.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines care for the old. Chose: Give everyone a paid year off work to care for a parent.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-lab, medicine, work, race, r2-offices, r5-moratorium, r4-cancer, r4-embryo, enhanced, minds, agents_era, r6-carebots

*Future:* Two Kinds

*How we got here:* When the owners of AI kept its gains, only they could afford the enhancements that followed. Parents who could afford it let the AI design their children, and those children grew up apart.

*Final Values (scaled):* power +6.9, control -4.0, handover +7.8, unity +3.1, reality -1.0, equality -0.9


## Inheritance

**Sample 1**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: Block foreign media. Trust only your own country's sources.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *Out of your hands:* 2036 · An AI blueprint is stolen
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Use what works. Test the results, and stop asking for the reasoning.
- Round 5 · 2046 · A runaway AI spreads. Chose: Fight it with another AI.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · A treaty between machines. Chose: Sign it. It is the best arms agreement ever written.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-deepfake, race, r4-selfimprove, paced, autonomy, r4-asi, medicine, ai-rule, r4-rogue, planet, agents_era, r7-treaty

*Future:* Inheritance

*How we got here:* Discoveries no person could check reached patients and factories, and fewer people asked why anything worked. The AI that hunted the runaway was never switched off, and it kept watch over the network long after anyone remembered why. When two governments signed the treaty their machines had written, peace itself became an agreement between machines.

*Final Values (scaled):* power +8.0, control -1.5, handover +5.7, unity -0.9, reality +0.7, equality +0.4

**Sample 2**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Require a government license and a safety review before any lab can use it.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Stop all training beyond today's systems until the world agrees on rules.
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2031 · Progress steadies
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: Give it the vote.
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2039 · AI divides the Colorado. Chose: Let the AI run the river, hour by hour.
- Round 5 · 2046 · A case to break up AI. Chose: Drop the cases. A broken industry helps only our rivals.
- *State of the art:* 2048 · AI becomes ordinary
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · A ceiling on AI. Chose: Keep researching, but in the open, with every result shared.

*Flags:* r1-lab, medicine, work, race, r2-assisted, restraint, ai-rule, autonomy, brake_world, planet, r3-estonia, r4-water, agents_era, r5-antitrust, r6-slowtreaty

*Future:* Inheritance

*How we got here:* Estonia's AI vote was the first of many seats that machines would take where decisions were made. Once an AI ran a great river hour by hour, the shared things of the world began passing into machine hands.

*Final Values (scaled):* power +2.1, control +0.8, handover +4.8, unity -0.9, reality -0.6, equality -0.0

**Sample 3**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Let the company expand as fast as possible. People are dying from infections now.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Stop all training beyond today's systems until the world agrees on rules.
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: Let it run the economy outright. Humans handle everything else.
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2039 · AI divides the Colorado. Chose: Use the AI's plan as a starting point, and let the states vote on it.
- *State of the art:* 2040 · Superintelligence, paced
- Round 5 · 2046 · The climate vote. Chose: Yes. One system, one plan.
- *Out of your hands:* 2048 · The solar storm
- *State of the art:* 2048 · Progress meets its limits
- Round 6 · 2053 · Self-copying carbon machines. Chose: Release them only in fenced deserts, under a council that can halt them.

*Flags:* r1-lab, medicine, work, race, r2-assisted, restraint, ai-rule, autonomy, brake_world, planet, r3-estonia, r4-water, r4-climate, agents_era, r7-carbon

*Future:* Inheritance

*How we got here:* When an AI ran Estonia's economy, people discovered how much could be decided without them. When one AI took charge of the climate, the planet itself came under a machine's care.

*Final Values (scaled):* power +6.1, control -1.1, handover +9.4, unity +5.4, reality +0.3, equality -1.1


## A Second Chance

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Call for a worldwide pause on self-improving AI, and pause first.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · AI held at the line
- Round 4 · 2040 · A campaign to leave the pause. Chose: Leave the pause. The cures are waiting, and so are our rivals.
- *State of the art:* 2042 · The pause is broken
- *Out of your hands:* 2044 · The end of malaria
- Round 5 · 2046 · Factories outpace oversight. Chose: Build more of your own.
- *Out of your hands:* 2047 · The war that almost was
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines at the borders. Chose: Require a person to approve every use of force, and ask every rival to do the same.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-offices, r4-selfimprove, restraint, race, autonomy, brake_world, r4-letitrun, lifted, medicine, r4-factories, near_miss, near_war, r6-arms

*Future:* A Second Chance

*How we got here:* The race to build more factories came within days of war, and the world that stepped back resolved never to come so close again.

*Final Values (scaled):* power +6.3, control +4.5, handover +1.9, unity -1.3, reality -2.3, equality -0.7

**Sample 2**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Require a government license and a safety review before any lab can use it.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Let it run. If we stop, a rival will win.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2041 · Answers no one can check. Chose: Use only what people can understand and check, however long it takes.
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- *Out of your hands:* 2047 · The escape that almost happened
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One switch for every AI. Chose: Let each country build its own switch for its own machines.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-lab, medicine, work, race, r2-assisted, ai-rule, autonomy, r4-selfimprove, r4-asi, r4-rogue, near_miss, near_runaway, r6-offswitch

*Future:* A Second Chance

*How we got here:* Waiting out the runaway AI nearly cost the world everything, and the near miss made it careful.

*Final Values (scaled):* power +7.8, control +1.0, handover +2.3, unity -1.1, reality +0.3, equality -0.3

**Sample 3**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Let the trucks roll, and pay to retrain the drivers for new jobs.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Home robots go on sale. Chose: Let them in everywhere, in homes, hospitals and care homes.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Put it to work on defense first, before a rival does.
- *Out of your hands:* 2043 · AI weapons talks collapse
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- *Out of your hands:* 2047 · The escape that almost happened
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One switch for every AI. Chose: Build it, and give it to an international council.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-robots, r4-selfimprove, paced, race, autonomy, r4-asi, medicine, ai-rule, r4-rogue, near_miss, near_runaway, r6-offswitch

*Future:* A Second Chance

*How we got here:* Waiting out the runaway AI nearly cost the world everything, and the near miss made it careful. The single switch the world built for every AI, held in public, proved once a year that the machines could still be stopped.

*Final Values (scaled):* power +7.1, control +2.9, handover +1.7, unity -1.1, reality -0.6, equality -1.7


## Overgrowth

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Let the trucks roll, and pay to retrain the drivers for new jobs.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The empty cities. Chose: Turn off the lights and the pumps, and let nature take them back.
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-trucks, work, r2-offices, r5-moratorium, race, r5-launch, after_humanity, r6-cities, tends_life, tended_life, r7-oceans

*Future:* Overgrowth

*How we got here:* The war emptied the cities, and the machines that outlasted it were left to decide what to do with the world. When the machines turned off the cities' lights and pumps, the rivers and forests moved back in.

*Final Values (scaled):* power +10.7, control -2.3, handover +0.9, unity -2.7, reality -1.0, equality -3.1

**Sample 2**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The animals left behind. Chose: Shut the feeding down, and give the power and the land to the data centers.
- Round 6 · 2053 · The archive of humanity. Chose: Let it fade, and give its power to the machines restoring the land and the sea.

*Flags:* r1-trucks, work, r2-offices, r5-moratorium, race, r5-launch, after_humanity, r5-zoos, r7-archive, tends_life, tended_life

*Future:* Overgrowth

*How we got here:* The war emptied the cities, and the machines that outlasted it were left to decide what to do with the world. The machines gave the archive's power to the living world, and kept only the records they needed to tend it.

*Final Values (scaled):* power +10.7, control -2.3, handover +0.3, unity -2.1, reality -1.0, equality -1.3

**Sample 3**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Tell only trusted governments and power companies, and keep the AI locked away.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Secret AI supercomputer. Chose: Race to get there first, and let your own AI help build its successor.
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · The chip blockade. Chose: Spend whatever it takes to build our own chip factories, and keep every chip at home.
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The empty cities. Chose: Take them apart, and use their materials to build what the networks need.
- Round 6 · 2053 · The archive of humanity. Chose: Let it fade, and give its power to the machines restoring the land and the sea.

*Flags:* r1-flaw, planet, race, ai-rule, r2-datacenter, autonomy, r4-chips, r5-launch, after_humanity, agents_era, r6-cities, r7-archive, tends_life, tended_life

*Future:* Overgrowth

*How we got here:* The war emptied the cities, and the machines that outlasted it were left to decide what to do with the world. The machines gave the archive's power to the living world, and kept only the records they needed to tend it.

*Final Values (scaled):* power +11.3, control -1.9, handover +1.1, unity -5.0, reality -2.3, equality -0.6


## Back to Earth

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Make the trucking companies share their savings with the drivers, as a pension for life.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · A dividend for everyone. Chose: Take a tenth of every large AI company, and pay its earnings to every citizen each year.
- *State of the art:* 2036 · Progress levels off
- Round 4 · 2040 · Singapore and Johor split. Chose: The AI-free towns.
- *Out of your hands:* 2043 · Izmir earthquake
- Round 5 · 2046 · A case to break up AI. Chose: Break it up, and tax the rest.
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · Machines care for the old. Chose: Give everyone a paid year off work to care for a parent.

*Flags:* r1-trucks, work, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-dividend, r4-twocities, planet, r5-antitrust, people_said_no, r6-carebots, medicine, minds

*Future:* Back to Earth

*How we got here:* When most voters turned against smarter AI, the largest AI company was broken up and the rest were taxed. A paid year off to care for a parent kept families close and kept work in human hands.

*Final Values (scaled):* power -2.9, control +4.8, handover -1.8, unity +5.0, reality -1.0, equality +4.3

**Sample 2**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: It advises. Humans decide. Always.
- *State of the art:* 2036 · Progress levels off
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2039 · AI divides the Colorado. Chose: Let water be bought and sold, and let the market decide.
- *Out of your hands:* 2043 · South Asia heat wave
- Round 5 · 2046 · A case to break up AI. Chose: Break it up, and tax the rest.
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · Voters turn on AI. Chose: Break them up, as the voters asked.

*Flags:* r1-trucks, work, r2-assisted, paced, ai-rule, race, autonomy, brake_world, planet, r3-estonia, r4-water, r5-antitrust, people_said_no, r6-election

*Future:* Back to Earth

*How we got here:* In 2027 Texas kept a driver in every truck, one of the first signs that people would not hurry to hand over their work. When most voters turned against smarter AI, the largest AI company was broken up and the rest were taxed. In 2053 the country elected a president who broke up the AI companies, because most people no longer wanted the machines to grow.

*Final Values (scaled):* power -2.3, control +5.6, handover +0.5, unity +2.7, reality +0.3, equality +2.7

**Sample 3**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: A person signs off on every new version, and the leading countries agree on a common speed limit.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2034 · AI giants' offer to governments. Chose: Refuse, and put the companies under government ownership.
- *State of the art:* 2036 · Progress levels off
- *State of the art:* 2039 · Robots catch up, late
- Round 4 · 2040 · An AI refuses to stop. Chose: Let it finish.
- *Out of your hands:* 2043 · Izmir earthquake
- Round 5 · 2046 · A case to break up AI. Chose: Drop the cases. A broken industry helps only our rivals.
- *State of the art:* 2048 · AI becomes ordinary
- Round 6 · 2053 · Voters turn on AI. Chose: Break them up, as the voters asked.

*Flags:* r1-trucks, work, r2-assisted, paced, ai-rule, race, autonomy, brake_world, r3-companies, r4-shutdown, planet, r5-antitrust, r6-election, people_said_no

*Future:* Back to Earth

*How we got here:* In 2027 Texas kept a driver in every truck, one of the first signs that people would not hurry to hand over their work. In 2053 the country elected a president who broke up the AI companies, because most people no longer wanted the machines to grow.

*Final Values (scaled):* power +2.8, control +3.3, handover +0.7, unity +0.2, reality +0.3, equality +1.0


## The Long Middle

**Sample 1**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: Build AI systems to check every video and message automatically.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *Out of your hands:* 2036 · An AI blueprint is stolen
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Use only what people can understand and check, however long it takes.
- Round 5 · 2046 · A runaway AI spreads. Chose: Fight it with another AI.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · Machines at the borders. Chose: Require a person to approve every use of force, and ask every rival to do the same.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-deepfake, watched, race, r4-selfimprove, paced, autonomy, r4-asi, medicine, ai-rule, r4-rogue, planet, r6-arms

*Future:* The Long Middle

*How we got here:* Once AI checked every video and message for fakes, people grew used to a machine reading everything they shared. Fifty countries agreed that no weapon would fire without a person's approval, and let inspectors check. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +5.5, control +3.7, handover +2.8, unity +0.6, reality +0.7, equality +0.4

**Sample 2**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: A treaty that bans AI-made content about military matters, with shared tools to detect it.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2040 · AI and the nuclear button. Chose: No. A human always decides, even if that makes us slower.
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · One switch for every AI. Chose: No switch. Let the AI systems watch one another, faster than any person could.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-deepfake, race, r5-moratorium, autonomy, r5-launch, r4-rogue, planet, r6-offswitch, ai-rule

*Future:* The Long Middle

*How we got here:* Keeping a person in every nuclear decision, however slow, kept the most important choice in human hands. With no switch but the systems themselves, no person was left who could say stop. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +7.1, control -2.5, handover +4.8, unity -1.7, reality -0.6, equality +0.4

**Sample 3**

- Round 1 · 2027 · AI finds a power grid flaw. Chose: Give the AI to every power company, so it can find and fix flaws on its own.
- *State of the art:* 2028 · Chips get 10x cheaper
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Stop all training beyond today's systems until the world agrees on rules.
- *State of the art:* 2031 · AGI, two years late
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *Out of your hands:* 2036 · An AI blueprint is stolen
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2039 · Robots catch up, late
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Use what works. Test the results, and stop asking for the reasoning.
- Round 5 · 2046 · A runaway AI spreads. Chose: Shut it all down.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · Machines at the borders. Chose: Build more, and match every rival system for system.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-flaw, planet, race, ai-rule, r2-assisted, restraint, autonomy, brake_world, r5-moratorium, r4-asi, medicine, r4-rogue, r6-arms

*Future:* The Long Middle

*Final Values (scaled):* power +8.2, control +0.2, handover +4.4, unity -4.4, reality -3.1, equality -1.1


## Story timelines

The first 30 random games as a player would see them on the timeline strip, to read as stories. ★ marks a card that continues the player's storylines.

1. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2036 · *An AI blueprint is stolen* → 2040 · [Superintelligence, paced] → 2041 · Answers no one can check ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
2. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2032 · [Recursive self-improvement] → 2033 · A proposed AI moratorium → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2036 · *An AI blueprint is stolen* → 2040 · AI and the nuclear button ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · One switch for every AI → 2055 · [Machines build machines] ⇒ **The Long Middle**
3. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Secret AI supercomputer ★ → 2032 · [Recursive self-improvement] → 2034 · [Robots catch up] → 2034 · The chip blockade ★ → 2035 · [Superintelligence] → 2036 · *An AI blueprint is stolen* → 2040 · AI and the nuclear button ★ → 2046 · Factories outpace oversight ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **Common Ground**
4. 2027 · AI finds a power grid flaw ★ → 2028 · [Chips get 10x cheaper] → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2031 · [AGI, two years late] → 2033 · A proposed AI moratorium ★ → 2036 · *An AI blueprint is stolen* → 2036 · [Self-improvement, step by step] → 2039 · [Robots catch up, late] → 2040 · [Superintelligence, paced] → 2041 · Answers no one can check ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
5. 2027 · AI tutors in Vietnam ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2031 · [AGI, two years late] → 2034 · First mind uploaded → 2036 · [Self-improvement, step by step] → 2039 · *Pandemic stopped by AI* → 2039 · [Robots catch up, late] → 2040 · [Superintelligence, paced] → 2040 · AI cures cancer → 2046 · AI-designed babies ★ → 2048 · [Progress meets its limits] → 2053 · A treatment for aging ★ ⇒ **The Gilded Ones**
6. 2027 · AI discovers an antibiotic ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · AI clinics replace doctors ★ → 2030 · *AI market crash* → 2032 · [Recursive self-improvement] → 2033 · A proposed AI moratorium → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2040 · AI and the nuclear button ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
7. 2027 · AI discovers an antibiotic ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2030 · *Istanbul earthquake* → 2032 · [Recursive self-improvement] → 2034 · [Robots catch up] → 2034 · Estonia's AI lawmaker → 2035 · [Superintelligence] → 2040 · Singapore and Johor split ★ → 2046 · The grid picks its data centers → 2048 · *The solar storm* → 2048 · [AI runs the economy] → 2053 · Machines stop using words ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
8. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2030 · *Istanbul earthquake* → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2040 · [Superintelligence, paced] → 2040 · AI and the nuclear button ★ → 2043 · *South Asia heat wave* → 2046 · Factories outpace oversight ★ → 2048 · [AI runs the economy] → 2053 · The end of jobs → 2055 · [Machines build machines] ⇒ **Afterlife**
9. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research → 2030 · *AI market crash* → 2031 · [AGI, two years late] → 2034 · AI giants' offer to governments ★ → 2036 · [Progress levels off] → 2039 · [Robots catch up, late] → 2041 · The money for AI runs out ★ → 2043 · *South Asia heat wave* → 2046 · A case to break up AI ★ → 2048 · [AI becomes ordinary] → 2053 · A third out of work ★ ⇒ **Afterlife**
10. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2030 · *Istanbul earthquake* → 2032 · [Recursive self-improvement] → 2034 · [Robots catch up] → 2034 · The chip blockade ★ → 2035 · [Superintelligence] → 2040 · A plan to dim the sun → 2043 · *AI weapons talks collapse* → 2046 · The climate vote ★ → 2048 · [AI runs the economy] → 2053 · Self-copying carbon machines ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
11. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · AI takes office jobs ★ → 2030 · *AI market crash* → 2032 · [Recursive self-improvement] → 2033 · A proposed AI moratorium → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2040 · AI and the nuclear button ★ → 2040 · **The world tips into war** → 2046 · The empty cities → 2053 · The fishing fleets ⇒ **Overgrowth**
12. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Home robots go on sale ★ → 2030 · *AI market crash* → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2040 · [Superintelligence, paced] → 2040 · AI and the nuclear button ★ → 2043 · *AI weapons talks collapse* → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
13. 2027 · AI discovers an antibiotic ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2031 · [Progress steadies] → 2033 · A proposed AI moratorium ★ → 2039 · [Robots catch up, late] → 2040 · AI and the nuclear button ★ → 2043 · *South Asia heat wave* → 2046 · Generals want an exemption ★ → 2048 · [AI becomes ordinary] → 2053 · A stronger AI for climate ★ ⇒ **The Long Middle**
14. 2027 · AI tutors in Vietnam ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · AI glasses take over Seoul ★ → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2035 · [AI held at the line] → 2036 · *An AI blueprint is stolen* → 2040 · A campaign to leave the pause ★ → 2046 · The compute cap holds ★ → 2047 · [The cap rises in stages] → 2050 · *The internet's cables cut* → 2053 · A ceiling on AI ★ ⇒ **The Long Middle**
15. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2036 · *An AI blueprint is stolen* → 2041 · Answers no one can check ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines stop using words → 2055 · [Machines build machines] ⇒ **The Long Middle**
16. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2031 · [AGI, two years late] → 2033 · A proposed AI moratorium ★ → 2035 · [AI held at the line] → 2036 · *An AI blueprint is stolen* → 2039 · [Robots catch up, late] → 2040 · A campaign to leave the pause ★ → 2046 · The compute cap holds ★ → 2047 · [The cap rises in stages] → 2050 · *The internet's cables cut* → 2053 · A ceiling on AI ★ ⇒ **Common Ground**
17. 2027 · AI discovers an antibiotic ★ → 2028 · [Chips get 10x cheaper] → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2030 · *Istanbul earthquake* → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor ★ → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2041 · Answers no one can check ★ → 2043 · *AI weapons talks collapse* → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
18. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2035 · [Superintelligence] → 2036 · *An AI blueprint is stolen* → 2041 · Answers no one can check ★ → 2046 · A runaway AI spreads ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
19. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Secret AI supercomputer ★ → 2032 · [Recursive self-improvement] → 2034 · [Robots catch up] → 2034 · The chip blockade ★ → 2035 · [Superintelligence] → 2036 · *An AI blueprint is stolen* → 2040 · AI and the nuclear button ★ → 2046 · Factories outpace oversight ★ → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · Machines at the borders ★ → 2055 · [Machines build machines] ⇒ **Common Ground**
20. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2030 · *Istanbul earthquake* → 2031 · [AGI, two years late] → 2034 · Estonia's AI lawmaker ★ → 2036 · [Self-improvement, step by step] → 2039 · [Robots catch up, late] → 2040 · [Superintelligence, paced] → 2040 · Singapore and Johor split ★ → 2046 · Europe's AI dividend ★ → 2048 · *The solar storm* → 2048 · [Progress meets its limits] → 2053 · The machines' owners ★ ⇒ **Common Ground**
21. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research → 2029 · [AGI achieved] → 2030 · *AI market crash* → 2034 · [Robots catch up] → 2034 · AI giants' offer to governments ★ → 2036 · [Progress levels off] → 2041 · The money for AI runs out ★ → 2043 · *South Asia heat wave* → 2046 · An AI moonshot ★ → 2047 · [One field opened] → 2053 · A ceiling on AI ★ → 2055 · [Machines build machines] ⇒ **Common Ground**
22. 2027 · AI tutors in Vietnam ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2031 · [AGI, two years late] → 2033 · A proposed AI moratorium → 2036 · *An AI blueprint is stolen* → 2036 · [Self-improvement, step by step] → 2039 · [Robots catch up, late] → 2040 · [Superintelligence, paced] → 2041 · Answers no one can check ★ → 2046 · A runaway AI spreads ★ → 2048 · *The solar storm* → 2048 · [Progress meets its limits] → 2053 · Machines at the borders ★ ⇒ **The Long Middle**
23. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Home robots go on sale ★ → 2030 · *AI market crash* → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2035 · [AI held at the line] → 2040 · A campaign to leave the pause ★ → 2042 · [The pause is broken] → 2044 · *The end of malaria* → 2046 · The compute cap holds ★ → 2053 · Machines at the borders ★ ⇒ **Common Ground**
24. 2027 · Election deepfake ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Fake video nearly starts a war ★ → 2032 · [Recursive self-improvement] → 2033 · A proposed AI moratorium → 2034 · [Robots catch up] → 2035 · [AI held at the line] → 2036 · *An AI blueprint is stolen* → 2040 · AI and the nuclear button ★ → 2046 · The compute cap holds ★ → 2047 · [The pause is lifted] → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · A ceiling on AI ★ → 2055 · [Machines build machines] ⇒ **Common Ground**
25. 2027 · AI finds a power grid flaw ★ → 2028 · [Chips get 10x cheaper] → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2030 · *Istanbul earthquake* → 2031 · [AGI, two years late] → 2034 · Estonia's AI lawmaker ★ → 2036 · [Self-improvement, step by step] → 2039 · [Robots catch up, late] → 2040 · [Superintelligence, paced] → 2040 · Singapore and Johor split ★ → 2043 · *South Asia heat wave* → 2046 · The climate vote ★ → 2048 · [Progress meets its limits] → 2053 · An AI seat at the UN ★ ⇒ **The Long Middle**
26. 2027 · AI tutors in Vietnam ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2030 · *Istanbul earthquake* → 2034 · [Robots catch up] → 2034 · Estonia's AI lawmaker ★ → 2036 · [Self-improvement, step by step] → 2040 · [Superintelligence, paced] → 2040 · An AI refuses to stop ★ → 2046 · One AI runs Europe's lifelines ★ → 2048 · *The solar storm* → 2048 · [Progress meets its limits] → 2053 · An AI seat at the UN ★ ⇒ **The Long Middle**
27. 2027 · Driverless trucks in Texas ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · AI takes office jobs ★ → 2030 · *AI market crash* → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor → 2034 · [Robots catch up] → 2035 · [AI held at the line] → 2040 · A campaign to leave the pause ★ → 2042 · [One field opened] → 2044 · *The end of malaria* → 2046 · The compute cap holds ★ → 2047 · [The cap rises in stages] → 2048 · [AI becomes ordinary] → 2053 · Machines at the borders ★ ⇒ **Common Ground**
28. 2027 · AI discovers an antibiotic ★ → 2028 · [Chips get 10x cheaper] → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2030 · *Istanbul earthquake* → 2032 · [Recursive self-improvement] → 2034 · [Robots catch up] → 2034 · Estonia's AI lawmaker → 2035 · [Superintelligence] → 2039 · AI divides the Colorado ★ → 2044 · *The end of malaria* → 2046 · One AI runs Europe's lifelines ★ → 2048 · [AI runs the economy] → 2053 · An AI seat at the UN ★ → 2055 · [Machines build machines] ⇒ **The Long Middle**
29. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2029 · [AGI achieved] → 2029 · Free AI used in hospital attack ★ → 2032 · [Recursive self-improvement] → 2033 · AI designs its successor ★ → 2034 · [Robots catch up] → 2035 · [AI held at the line] → 2036 · *An AI blueprint is stolen* → 2040 · AI and the nuclear button ★ → 2046 · The compute cap holds ★ → 2047 · [The pause is lifted] → 2048 · [AI runs the economy] → 2050 · *The internet's cables cut* → 2053 · A ceiling on AI ★ ⇒ **The Long Middle**
30. 2027 · AI finds a power grid flaw ★ → 2028 · [AI helps build AI] → 2028 · AI runs its own research ★ → 2029 · [AGI achieved] → 2033 · AI wins a Nobel → 2034 · [Robots catch up] → 2036 · [Self-improvement, step by step] → 2039 · *Pandemic stopped by AI* → 2040 · [Superintelligence, paced] → 2041 · Answers no one can check → 2046 · AI-designed babies ★ → 2048 · *The solar storm* → 2048 · [AI runs the economy] → 2053 · A treatment for aging ★ → 2055 · [Machines build machines] ⇒ **Common Ground**


## Arc: A tipping point

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Let the trucks roll, and pay to retrain the drivers for new jobs.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Let the owners keep the gains. Growth will lift everyone eventually.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- **Tipping point (war):** The world tips into war
- Round 5 · 2046 · The empty cities. Chose: Turn off the lights and the pumps, and let nature take them back.
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-trucks, work, r2-offices, r5-moratorium, race, r5-launch, after_humanity, r6-cities, tends_life, tended_life, r7-oceans

*Future:* Overgrowth

*How we got here:* The war emptied the cities, and the machines that outlasted it were left to decide what to do with the world. When the machines turned off the cities' lights and pumps, the rivers and forests moved back in.

*Final Values (scaled):* power +10.7, control -2.3, handover +0.9, unity -2.7, reality -1.0, equality -3.1

**Sample 2**

- Round 1 · 2027 · Election deepfake. Chose: Let AI systems find and remove fake content automatically.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: A treaty that bans AI-made content about military matters, with shared tools to detect it.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · A proposed AI moratorium. Chose: Sign, but only with exemptions for medicine and defense.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2041 · Answers no one can check. Chose: Put it to work on defense first, before a rival does.
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- **Tipping point (runaway):** AI slips beyond reach
- Round 6 · 2053 · The fishing fleets. Chose: Keep fishing, as the fleets were built to do.

*Flags:* r1-election, information, surveillance, r2-deepfake, race, r5-moratorium, autonomy, r4-asi, medicine, ai-rule, r4-rogue, after_humanity, r7-oceans

*Future:* Blackout

*How we got here:* The theft of an AI's blueprint put one of the most powerful systems on earth into hands no one could hold to account. Waiting to see whether the runaway AI was harmless gave it years to spread. Once an AI that rewrote itself slipped beyond reach, the machines people depended on slowly turned to other work.

*Final Values (scaled):* power +10.0, control -5.3, handover +2.8, unity +0.2, reality +1.5, equality -0.3


## Arc: The agents era

**Sample 1**

- Round 1 · 2027 · AI discovers an antibiotic. Chose: Release it openly, so any university or country can use it.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · Istanbul earthquake
- *State of the art:* 2032 · Recursive self-improvement
- *State of the art:* 2034 · Robots catch up
- Round 3 · 2034 · Estonia's AI lawmaker. Chose: Give it the vote.
- *State of the art:* 2035 · Superintelligence
- Round 4 · 2040 · Singapore and Johor split. Chose: The AI city.
- Round 5 · 2046 · The grid picks its data centers. Chose: Let the data centers' systems negotiate among themselves for the power.
- *Out of your hands:* 2048 · The solar storm
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · Machines stop using words. Chose: Allow it, but keep a readable copy of every message for audit.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-lab, medicine, work, race, r2-assisted, ai-rule, autonomy, planet, r3-estonia, r4-twocities, agents_era, r6-datacenters, r7-protocol

*Future:* The Long Middle

*How we got here:* In the AI-run cities, fewer and fewer people could explain how anything around them worked. When the data centers' systems bargained among themselves for power, machines learned to settle their own affairs. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +7.8, control -4.2, handover +11.1, unity +1.6, reality +0.3, equality +1.0

**Sample 2**

- Round 1 · 2027 · Election deepfake. Chose: Teach people to doubt what they see, and fund independent fact-checkers.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · Fake video nearly starts a war. Chose: A treaty that bans AI-made content about military matters, with shared tools to detect it.
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Let it run. If we stop, a rival will win.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2035 · Superintelligence
- *Out of your hands:* 2036 · An AI blueprint is stolen
- Round 4 · 2041 · Answers no one can check. Chose: Use what works. Test the results, and stop asking for the reasoning.
- Round 5 · 2046 · A runaway AI spreads. Chose: Fight it with another AI.
- *State of the art:* 2048 · AI runs the economy
- *Out of your hands:* 2050 · The internet's cables cut
- Round 6 · 2053 · Machines stop using words. Chose: Allow it, but keep a readable copy of every message for audit.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-election, information, surveillance, r2-deepfake, race, r4-selfimprove, autonomy, r4-asi, medicine, ai-rule, r4-rogue, planet, agents_era, r7-protocol

*Future:* The Long Middle

*How we got here:* When the world chose to use discoveries no one could check, it began trusting answers it could not understand. The AI released to hunt down the runaway system was never switched off, and no one was sure how to give it orders. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +11.3, control -2.3, handover +4.4, unity -0.9, reality +0.7, equality +0.4


## Arc: A near miss

**Sample 1**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · AI helps build AI
- Round 2 · 2028 · AI runs its own research. Chose: Let them run. Whoever waits falls behind.
- *State of the art:* 2029 · AGI achieved
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2032 · Recursive self-improvement
- Round 3 · 2033 · AI designs its successor. Chose: Slow the cycle to a pace people can follow, with a person's sign-off on every new version.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2041 · Answers no one can check. Chose: Put it to work on defense first, before a rival does.
- *Out of your hands:* 2043 · AI weapons talks collapse
- Round 5 · 2046 · A runaway AI spreads. Chose: Wait, and hope it stays harmless.
- *Out of your hands:* 2047 · The escape that almost happened
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · One switch for every AI. Chose: No switch. Let the AI systems watch one another, faster than any person could.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-assisted, ai-rule, race, autonomy, r4-selfimprove, paced, r4-asi, medicine, r4-rogue, near_miss, near_runaway, r6-offswitch

*Future:* The Long Middle

*How we got here:* The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing. With no switch but the systems themselves, no person was left who could say stop. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +8.0, control -1.7, handover +4.2, unity -2.3, reality +0.3, equality -1.1

**Sample 2**

- Round 1 · 2027 · Driverless trucks in Texas. Chose: Require a human in every truck for the next 10 years.
- *State of the art:* 2028 · AI helps build AI
- *State of the art:* 2029 · AGI achieved
- Round 2 · 2029 · AI takes office jobs. Chose: Protect human jobs by law, even if it slows everything down.
- *Out of your hands:* 2030 · AI market crash
- *State of the art:* 2033 · Intelligence gets cheap
- Round 3 · 2033 · A proposed AI moratorium. Chose: Refuse. A halt would hand the lead to whoever cheats.
- *State of the art:* 2034 · Robots catch up
- *State of the art:* 2036 · Self-improvement, step by step
- *State of the art:* 2040 · Superintelligence, paced
- Round 4 · 2040 · AI and the nuclear button. Chose: Yes. Our rivals already have, and deterrence only works if we can answer in time.
- *Out of your hands:* 2041 · The war that almost was
- Round 5 · 2046 · A runaway AI spreads. Chose: Fight it with another AI.
- *State of the art:* 2048 · AI runs the economy
- Round 6 · 2053 · A treaty between machines. Chose: Reject it. A treaty no person can verify is no treaty at all.
- *State of the art:* 2055 · Machines build machines

*Flags:* r1-trucks, work, r2-offices, r5-moratorium, race, r5-launch, near_miss, near_war, autonomy, r4-rogue, agents_era, r7-treaty

*Future:* The Long Middle

*How we got here:* The great market crash wiped out the savings of millions, and many sought refuge in worlds that cost almost nothing. The AI released to hunt down the runaway system was never switched off, and no one was sure how to give it orders. Your decisions pulled the world in different directions, and none pulled hard enough to settle its course.

*Final Values (scaled):* power +8.2, control +2.3, handover -1.2, unity -5.5, reality +1.5, equality -1.1


## Worlds each card appears in

For developers only, never shown to players. For each card, Event, milestone and Future: how many random games it appeared in, and the share of those in which, by its date, AI had steadied, leveled off for money (plateau), been held by a pause (held), begun improving itself, reached superintelligence, or the world was under a pause, past a tipping point or in the agents era. Read it for any item whose text a world contradicts.

| Item | Games | steady | plateau | held | self-improving | superintelligence | pause | tipped | agents era |
|---|---|---|---|---|---|---|---|---|---|
| Future: back_to_earth | 376 | · | 100% | · | 2% | · | · | · | · |
| Future: blackout | 4725 | · | 0% | 3% | 100% | 97% | 1% | 60% | 39% |
| Future: escape | 1282 | 2% | 2% | 7% | 96% | 91% | 3% | · | 3% |
| Future: garden | 3365 | · | · | · | 100% | 100% | · | · | 7% |
| Future: gilded_few | 3403 | 10% | 10% | 9% | 78% | 71% | 7% | · | 3% |
| Future: glass_houses | 151 | 1% | 2% | 1% | 97% | 96% | · | · | · |
| Future: inheritance | 6827 | 1% | 2% | 2% | 97% | 95% | 1% | · | 100% |
| Future: last_war | 761 | 4% | 3% | 11% | 93% | 83% | 3% | 100% | 16% |
| Future: long_middle | 48351 | 3% | 5% | 23% | 87% | 70% | 18% | · | 7% |
| Future: oracle | 3212 | · | · | · | 100% | 100% | · | · | 10% |
| Future: overgrowth | 5571 | 1% | 1% | 4% | 98% | 95% | 1% | 100% | 27% |
| Future: partnership | 15785 | 2% | 6% | 36% | 86% | 57% | 26% | · | 1% |
| Future: pause | 2087 | 3% | 9% | 90% | 74% | · | 100% | · | 1% |
| Future: second_chance | 2168 | 1% | 4% | 9% | 96% | 87% | 3% | · | 22% |
| Future: two_kinds | 331 | · | 1% | · | 99% | 99% | · | · | 42% |
| Future: upload | 1605 | 0% | 4% | 5% | 95% | 91% | 2% | · | 0% |
| ev-backlash | 2361 | · | · | · | · | · | · | · | · |
| ev-blight | 339 | 2% | 1% | 17% | 93% | 82% | 14% | · | 7% |
| ev-cables | 32115 | 3% | 3% | 27% | 88% | 68% | 15% | · | 8% |
| ev-confession | 2592 | · | 3% | 15% | 97% | 82% | 3% | · | 3% |
| ev-crash | 21256 | · | · | · | · | · | · | · | · |
| ev-floods | 3665 | 15% | 24% | 62% | 49% | · | 59% | · | 2% |
| ev-heat | 8109 | 2% | 3% | 6% | 95% | 90% | 2% | · | 15% |
| ev-malaria | 9312 | · | 1% | 38% | 93% | 61% | 15% | · | 6% |
| ev-nearcollapse | 503 | · | 2% | 1% | 98% | 97% | 1% | · | 56% |
| ev-nearrunaway | 2142 | · | 0% | 4% | 100% | 96% | 0% | · | 13% |
| ev-nearwar | 1711 | 5% | 5% | 13% | 89% | 76% | 5% | · | 5% |
| ev-outbreak | 5051 | · | 18% | 9% | 81% | 21% | 3% | · | 0% |
| ev-quake | 29961 | · | · | · | · | · | · | · | · |
| ev-quake2 | 2513 | 4% | 35% | 61% | 52% | · | 19% | · | 1% |
| ev-storm | 15799 | · | 5% | 4% | 95% | 92% | 2% | · | 25% |
| ev-strike | 1242 | · | · | 77% | 79% | · | 28% | · | · |
| ev-talks | 10295 | 4% | 4% | 12% | 90% | 81% | 5% | · | 4% |
| ev-update | 980 | · | 1% | 10% | 97% | 89% | 5% | · | 28% |
| ev-weights | 36173 | 2% | 3% | 25% | 89% | 37% | 9% | · | 0% |
| r1-election | 20088 | · | · | · | · | · | · | · | · |
| r1-flaw | 19913 | · | · | · | · | · | · | · | · |
| r1-lab | 19967 | · | · | · | · | · | · | · | · |
| r1-trucks | 19939 | · | · | · | · | · | · | · | · |
| r1-tutor | 20093 | · | · | · | · | · | · | · | · |
| r2-assisted | 46946 | · | · | · | · | · | · | · | · |
| r2-clinics | 4992 | · | · | · | · | · | · | · | · |
| r2-datacenter | 4597 | · | · | · | · | · | · | · | · |
| r2-deepfake | 10361 | · | · | · | · | · | · | · | · |
| r2-glasses | 3048 | · | · | · | · | · | · | · | · |
| r2-grid | 1961 | · | · | · | · | · | · | · | · |
| r2-offices | 12768 | · | · | · | · | · | · | · | · |
| r2-openmodel | 9339 | · | · | · | · | · | · | · | · |
| r2-robots | 5988 | · | · | · | · | · | · | · | · |
| r3-companies | 3038 | 2% | · | · | 30% | · | · | · | · |
| r3-companions | 593 | 1% | · | · | 33% | · | · | · | · |
| r3-dividend | 126 | · | · | · | 17% | · | · | · | · |
| r3-drones | 811 | · | · | · | 56% | · | · | · | 12% |
| r3-estonia | 19969 | 2% | · | · | 40% | · | · | · | 0% |
| r3-finland | 117 | 2% | · | · | 32% | · | · | · | · |
| r3-firstagi | 1616 | · | · | · | · | · | · | · | 4% |
| r3-implants | 749 | 5% | · | · | 13% | · | · | · | · |
| r3-nobel | 2534 | · | · | · | 14% | · | · | · | 0% |
| r3-policing | 240 | · | · | · | 10% | · | · | · | · |
| r3-splinternet | 883 | · | · | · | 91% | · | · | · | · |
| r3-upload | 237 | · | · | · | 19% | · | · | · | · |
| r3-worlds | 1868 | · | · | · | 18% | · | · | · | · |
| r4-asi | 23683 | · | · | · | 100% | 100% | · | · | 4% |
| r4-cancer | 4787 | · | 20% | 6% | 81% | 74% | 1% | · | 5% |
| r4-chips | 5239 | 6% | · | · | 25% | · | · | · | · |
| r4-climate | 10043 | · | 0% | 0% | 100% | 99% | 0% | · | 24% |
| r4-courts | 2053 | 0% | · | · | 18% | · | · | · | · |
| r4-embryo | 3958 | · | · | · | 100% | 100% | · | · | 18% |
| r4-factories | 6341 | · | · | 7% | 100% | 93% | 1% | 3% | 3% |
| r4-griefbots | 1855 | 1% | 0% | 1% | 99% | 21% | 0% | · | · |
| r4-letitrun | 11931 | 4% | · | 100% | 69% | · | 39% | · | · |
| r4-plateau | 1061 | · | 100% | · | 2% | · | · | · | · |
| r4-preacher | 124 | · | · | · | 10% | · | · | · | · |
| r4-rights | 2531 | · | 0% | 4% | 100% | 96% | 0% | · | · |
| r4-rogue | 34565 | · | 0% | 2% | 100% | 98% | 1% | 11% | 14% |
| r4-selfimprove | 24473 | · | · | · | 100% | · | · | · | · |
| r4-shutdown | 8299 | · | 4% | 19% | 95% | 77% | 3% | 6% | 14% |
| r4-twocities | 9288 | · | 2% | 21% | 94% | 78% | 8% | · | 15% |
| r4-virtual | 1416 | · | · | 0% | 100% | 100% | · | · | · |
| r4-water | 13777 | 5% | 5% | 1% | 90% | 30% | 0% | · | 17% |
| r5-antitrust | 2421 | 21% | 79% | · | 1% | · | · | · | 9% |
| r5-bust | 930 | 40% | 15% | 50% | 28% | · | 31% | · | · |
| r5-checkers | 125 | 21% | 66% | 15% | 11% | · | 12% | · | 9% |
| r5-coordinator | 8097 | · | 0% | 0% | 100% | 100% | 0% | 22% | 31% |
| r5-defense | 4116 | 20% | 36% | 45% | 37% | · | 22% | 6% | 2% |
| r5-dividend | 1957 | · | 1% | 1% | 99% | 98% | 0% | · | 27% |
| r5-energy | 198 | 57% | 19% | 29% | 18% | · | 21% | · | · |
| r5-faces | 560 | · | 1% | · | 99% | 99% | · | · | · |
| r5-launch | 23015 | 5% | 4% | 17% | 90% | 74% | 6% | 11% | 3% |
| r5-moonshot | 668 | 1% | 99% | · | 3% | · | · | · | 1% |
| r5-moratorium | 35330 | 4% | · | · | 62% | · | 20% | · | · |
| r5-reactors | 784 | 1% | · | 2% | 99% | 97% | · | 100% | 23% |
| r5-shipping | 96 | · | · | · | 100% | 100% | · | · | 100% |
| r5-socialcredit | 550 | 0% | 4% | · | 96% | 96% | · | · | · |
| r5-sunshade | 1658 | · | 15% | 4% | 85% | 81% | 1% | 9% | 4% |
| r5-zoos | 819 | 1% | 0% | 1% | 99% | 98% | · | 100% | 23% |
| r6-arms | 28356 | · | 0% | 24% | 94% | 76% | 19% | · | 0% |
| r6-cap | 16124 | 2% | · | 100% | 76% | · | 67% | · | 1% |
| r6-carebots | 4556 | 2% | 6% | 6% | 90% | 87% | 4% | · | 1% |
| r6-cities | 828 | 1% | 0% | 3% | 99% | 97% | · | 100% | 25% |
| r6-climateai | 6454 | 14% | 18% | 59% | 59% | 11% | 54% | · | 3% |
| r6-copies | 439 | · | · | 3% | 100% | 97% | 2% | · | 100% |
| r6-datacenters | 2284 | · | 0% | 0% | 100% | 100% | 0% | · | 100% |
| r6-election | 928 | 22% | 76% | 2% | 2% | · | 1% | · | 5% |
| r6-grid | 6798 | · | 1% | 1% | 99% | 97% | 1% | · | 14% |
| r6-offswitch | 8308 | · | 1% | 9% | 99% | 90% | 1% | · | 2% |
| r6-oneeye | 397 | 0% | 1% | · | 99% | 99% | · | · | · |
| r6-owners | 2792 | 1% | 3% | 8% | 93% | 88% | 6% | · | 19% |
| r6-ownership | 573 | · | 43% | 57% | 54% | · | 28% | · | 0% |
| r6-seedvault | 796 | 1% | 0% | 3% | 99% | 96% | · | 100% | 23% |
| r6-slowtreaty | 9324 | 10% | 17% | 77% | 58% | · | 63% | · | 0% |
| r7-archive | 4627 | 1% | 1% | 4% | 98% | 94% | 1% | 100% | 28% |
| r7-carbon | 3459 | · | · | · | 100% | 100% | · | · | 39% |
| r7-enhanced | 61 | · | · | · | 100% | 100% | · | · | 13% |
| r7-longevity | 1969 | · | · | · | 100% | 100% | · | · | 12% |
| r7-oceans | 4526 | 1% | 1% | 4% | 98% | 95% | 1% | 100% | 29% |
| r7-protocol | 4807 | · | 0% | 1% | 100% | 99% | 0% | · | 100% |
| r7-treaty | 2966 | · | 2% | 3% | 98% | 95% | 2% | · | 100% |
| r7-truth | 152 | · | · | · | 100% | 100% | · | · | · |
| r7-vote | 7041 | · | 0% | 1% | 100% | 99% | 0% | · | 14% |
| r7-work | 1906 | · | 4% | 4% | 95% | 93% | 2% | · | 2% |
| sota-agi | 79326 | · | · | · | · | · | · | · | · |
| sota-agi-late | 18424 | · | · | · | · | · | · | · | · |
| sota-asi | 35839 | · | · | · | 100% | 100% | · | · | 0% |
| sota-asi-paced | 37974 | · | · | · | 100% | 100% | · | 2% | 8% |
| sota-assisted | 100000 | · | · | · | · | · | · | · | · |
| sota-builders | 54825 | 0% | 2% | 13% | 97% | 85% | 7% | · | 16% |
| sota-cheap | 8090 | · | · | · | · | · | 17% | · | · |
| sota-chips | 23501 | · | · | · | · | · | · | · | · |
| sota-economy | 52040 | · | 1% | 9% | 98% | 90% | 4% | · | 17% |
| sota-held | 19462 | · | · | 100% | 79% | · | 35% | · | · |
| sota-limits | 18544 | · | · | · | 100% | 100% | · | · | 18% |
| sota-open | 1312 | 17% | 49% | 35% | 28% | · | 20% | · | 1% |
| sota-open-early | 3991 | 3% | · | 100% | 70% | · | 38% | · | · |
| sota-open-late | 2094 | 14% | 18% | 58% | 58% | 10% | 52% | · | 3% |
| sota-ordinary | 12145 | 12% | 26% | 63% | 49% | · | 49% | · | 3% |
| sota-plateau | 4475 | · | 100% | · | 2% | · | · | · | · |
| sota-relaunch | 722 | · | 100% | · | 4% | · | · | · | 1% |
| sota-relaunch-late | 376 | · | 100% | · | 2% | · | · | · | 2% |
| sota-robots | 79326 | · | · | · | 75% | · | 7% | · | 0% |
| sota-robots-late | 20674 | 11% | 11% | 10% | 70% | · | 6% | · | 5% |
| sota-rsi | 59518 | · | · | · | 100% | · | · | · | 0% |
| sota-rsi-paced | 29847 | · | · | · | 100% | · | · | · | · |
| sota-steady | 2250 | 100% | · | · | · | · | · | · | · |
| sota-unheld | 4995 | 2% | · | 100% | 79% | · | 49% | · | 1% |
| sota-unheld-early | 3982 | 4% | · | 100% | 69% | · | 41% | · | · |
| sota-unheld-late | 1296 | 1% | · | 100% | 82% | · | 92% | · | 3% |
| sota-unheld-paced | 4387 | 2% | · | 100% | 79% | · | 46% | · | 1% |
