---
title: Freight at VSP
---

{% include i18n/i18n %}

**FAKE TEXT - edit!**

**@Billy: Please also cross-check and correct the language :) **

The projects “Carrier Agents and Interactions with Traffic flows” (https://www.tu.berlin/vsp/forschung/projekte/freight-ii) and “Analysis of strategies for the full decarbonization of urban transport (ZeroCUTS)” ("Analyse von Strategien zur vollständigen Dekarbonisierung des urbanen Verkehrs",  https://www.tu.berlin/vsp/forschung/projekte/zerocuts), funded by the German Research Foundation (DFG), deal with the simulation of freight transport and the comparison of different decarbonization strategies.
MATSim is coupled with the vehicle routing problem (VRP) solver Jsprit. 
Solving the VRPs can be done under different conditions (e.g. vehicle types, prices, technologies), resulting in different solutions to handle the demand. 
By comparing the results, it is possible to show the most cost-effective solution to decarbonize the freight traffic. 
To visualize the different scenarios, including single carriers and each tour, we use the tool SimWrapper, which was developed at our department.

** Plot von Karte einfügen **

The plot visualizes the results of tour planning for a food retailing chain, transporting goods from depots to the different stores in Berlin. 
In several studies we show that it is possible to use battery electric trucks for these tasks instead of diesel trucks. 
While a few years ago their range was not sufficient for all tours, this is not an issue anymore. 
Moreover, the costs when using electric trucks are now comparable to using diesel trucks. 

### Interesting links to SimWrapper etc: TODO: PLEASE FIND A NICE NAME FOR THIS :)

Under (https://simwrapper.github.io/site/public/de/berlin/projects/freight/) you can find all simulation runs, for the scenario with limited battery capacity. 
There are two different directories: 
- foodRetailing_**wo**_rangeConstraint assumes, that the battery capacity is no issues for the tour planning, e.g. due to recharging while loading/unloading.
- foodRetailing_**with**_rangeConstraint assumes, that the battery capacity limits the tour, and there is **no** recharging possible during the tour.

For both, we run different simulation runs, with increasing variable costs per distance for the diesel trucks. 
The value came from a (fictive) CO2 tax, increasing the diesel costs.
E.g. "noTax", means that there is no additional tax on diesel, while "Tax300" means, that there is an additional tax of 300 Euro per tons CO2 included.

To see the tours in the visualization as above, please click on the "Carries" map, of the scenario you like.
The visualization of the scenario with range limited electric trucks and a CO2 tax of 300 Euro per ton can be found here: https://simwrapper.github.io/site/public/de/berlin/projects/freight/foodRetailing_with_rangeConstraint/28_ICEVBEV_NwCE_BVWP_10000it_DC_Tax300/output_carriers.xml.gz

### Publications 

Publication related to the projects can be found here: https://vsp.berlin/publications/?tags=dfg-carbon-free-traffic,dfg-freight
