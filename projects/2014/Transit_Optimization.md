---
title: Transit Optimization ("paratransit") - An agent-based evolutionary approach for the user-oriented optimization of complex public transit systems
---

{% include i18n/i18n %}

<div class="invert-images" markdown=1>

## Project description

The planning process in public transportation is usually divided into sequential planning phases, moving from a strategic to an operational level.

Public transit networks are often run by multiple operators and companies. These companies tend to optimize their services according to some optimization procedure of their own. Such a system may evolve cooperative structures by itself. However, often it leads to an inefficient over-provision of transport.

While transit network optimization methods evidently need some model of the user reactions, in many approaches the optimization model and the demand assignment are two separate steps. Most analytical approaches of modeling the interaction of demand and public transport supply account for mode and route choice decisions, following a trip-based approach. Dynamic user behavior, such as the temporal reaction to public transit schedules, is usually neglected; also more complex models of behavioral responses are typically not integrated in those optimization approaches.

**Objectives**

-   Develop and implement model that is able to generate plausible [paratransit](/projects/2014/paratransit_as_a_demand_responsive_service) structures “out of nothing”
-   Develop and implement model that is able to take an existing schedule-based public transit system as input, and is able to suggest improvements of routes (e.g. making them longer, or shorter, or modify their course), frequencies and service periods (e.g. increase frequencies during high demand periods, decrease frequencies during low demand periods), or pricing (e.g. increase/decrease fares during high/low demand periods)
-   Include passenger reactions (minimally mode choice, route choice, departure choice)
-   Include revenues and operating costs, welfare changes, and emissions changes
-   Demonstrate the above objectives with illustrative scenarios
-   Perform studies with real-world systems in order to demonstrate real-world applicability

**Relevance to fields other than science**

An important gap, especially for applications in developing countries, is that none of the current regional transport simulation packages includes an adequate model for paratransit. Without paratransit, however, the models do not do justice to the lower income groups, and are thus not sufficently equitable to be useful in practice. The present project will address that shortcoming, and provide an automatically generated paratransit system that will (1) provide structurally correct answers even without further calibration, and that can (2) be extended and made more realistic as additional field data comes in for a particular study.

Public transit systems may be useful for users not because they serve a simple commuter pattern, but because they are able to serve all transport needs of the population including complex shopping, maintenance, or leisure trips. All of this implies that it is useful to include a detailed model of user reactions directly into the optimization routines. It also implies that the design of a new system “from scratch” may be less useful than an approach that suggests stepwise improvement, and where for every step it is possible to check with a practitioner if that step might be feasible or not, and to remove it from the improvement algorithm if not. The project will develop such an approach.

## Funding agency

DFG: [German research Foundation](http://www.dfg.de/index.jsp)

## Publications

See [here](https://vsp.berlin/publications/).

## Contact

[Andreas Neumann](https://www.tu.berlin/vsp/team), TU Berlin

## Cooperation with other researchers

**Prof. J. Joubert**, University of Pretoria, South Africa on the modeling and simulation of urban regions in South Africa.

**Prof. A. Tirachini**, University of Chile, Santiago, on the modeling and the economic analysis of public transport systems.

**Prof. M. Maciejewski**, Poznan University of Technology, Poland, on the modeling and simulation of taxicabs and courier services.