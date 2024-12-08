---
title: Freight at VSP
---

{% include i18n/i18n %}

<div class="invert-images" markdown=1>

![Example Tour Planning for food/grocery transport in Berlin](/assets/images/berlin-freight-depots.jpg)
_Example Tour Planning for depot-based food/grocery transport in Berlin_

## Freight research at VSP

Two projects funded by the German Research Foundation (DFG):
- [Carrier Agents and Interactions with Traffic flows](https://www.tu.berlin/vsp/forschung/projekte/freight-ii) and
- [Analysis of strategies for the full decarbonization of urban transport (ZeroCUTS)](https://www.tu.berlin/vsp/forschung/projekte/zerocuts), <br/>*Analyse von Strategien zur vollständigen Dekarbonisierung des urbanen Verkehrs*

 deal with the simulation of freight transport and the comparison of different decarbonization strategies. [MATSim](https://matsim.org) is coupled with the vehicle routing problem (VRP) solver [Jsprit](https://jsprit.github.io/).

Solving the VRPs can be done under different conditions (e.g. vehicle types, prices, technologies), resulting in different solutions to handle the demand.
By comparing the results, it is possible to show the most cost-effective solution to decarbonize the freight traffic.

The plot above depicts the results of tour planning for a food retailing chain, transporting goods from depots to the different stores in Berlin.
In several studies we show that it is possible to use battery electric trucks for these tasks instead of diesel trucks.

While a few years ago their range was not sufficient for all tours, this is not an issue anymore. Moreover, the costs when using electric trucks are now comparable to using diesel trucks.

To visualize the different scenarios, including single carriers and each tour, we use the [visualization tool SimWrapper](https://vsp.berlin/simwrapper), which was developed at our department.


## Try the interactive tool!

VSP has developed "SimWrapper" — an interactive web-based tool for displaying and exploring MATSim simulation results.

All simulation runs for the scenario examining limited battery capacity are below.

<p style="padding: 1rem; background-color: #ffc; border-left: 1rem solid #ee7;">
<b><i>These links work best on desktop browsers or tablets!<br/>Simulation results are too detailed to display on a mobile phone screen.</i></b>
</p>

### Food retailing scenarios: freight carrier visualizations

<span style="color: #158055; font-weight: 500;">Without Range Constraints</span> assumes that battery capacity is not an issue for tour planning, e.g. due to recharging while loading/unloading.

<span style="color: #158055; font-weight: 500;">With Range Constraints</span>  assumes that battery capacity limits the tour length/duration: there is _no recharging possible_ during the tour.

| <span style="color: #158055; font-weight: 500;">Without Range Constraints:</span> | <span style="color: #158055; font-weight: 500;">With Range Constraints:</span> |
|---|---|
| [![No Diesel CO2 Tax](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_wo_rangeConstraint/71_ICEVBEV_NwCE_BVWP_10000it_DCoff_noTax/viz-carriers.yaml)<br/>No Diesel Tax | [![No Diesel CO2 Tax](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_with_rangeConstraint/21_ICEVBEV_NwCE_BVWP_10000it_DC_noTax/viz-carriers.yaml)<br/>No Diesel Tax |
| [![50 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_wo_rangeConstraint/73_ICEVBEV_NwCE_BVWP_10000it_DCoff_Tax50/viz-carriers.yaml)<br/>50 € per ton CO2 | [![50 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_with_rangeConstraint/23_ICEVBEV_NwCE_BVWP_10000it_DC_Tax50/viz-carriers.yaml)<br/>50 € per ton CO2 |
|[![150 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_wo_rangeConstraint/75_ICEVBEV_NwCE_BVWP_10000it_DCoff_Tax150/viz-carriers.yaml)<br/>150 € per ton CO2 | [![50 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_with_rangeConstraint/25_ICEVBEV_NwCE_BVWP_10000it_DC_Tax150/viz-carriers.yaml)<br/>150 € per ton CO2 |
| [![300 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_wo_rangeConstraint/78_ICEVBEV_NwCE_BVWP_10000it_DCoff_Tax300/viz-carriers.yaml)<br/>300 € per ton CO2 | [![300 € per ton CO2](/assets/images/freight-thumbnail.jpg)](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/foodRetailing_with_rangeConstraint/28_ICEVBEV_NwCE_BVWP_10000it_DC_Tax300/viz-carriers.yaml)<br/>300 € per ton CO2 |

</div>

For both, we run multiple simulation runs with increasing variable costs per distance for the diesel trucks.

The diesel tax values came from a (fictitious) CO2 tax which increases the diesel costs. E.g. `noTax`, means that there is no additional tax on diesel, while `Tax300` means that there is an additional tax included of 300 € per ton CO2.

### Full results

To go deeper and explore every scenario available, you can [click here](https://vsp.berlin/simwrapper/public/de/berlin/projects/freight/).

There are folders for each simulation run. You can dive into the many folders of results there, categorized by battery range constraints and diesel tax costs.

Once you find a folder of results you can click the **Carrier Explorer** to view the interactive tool.

Have fun exploring.

## Publications: for further information

Publications related to these (and many other) projects can be found here: [vsp.berlin/publications](https://vsp.berlin/publications/?tags=dfg-carbon-free-traffic,dfg-freight)
