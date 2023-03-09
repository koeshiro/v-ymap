Feature("YMap");

Scenario("y-map", async ({ I }) => {
    await I.amOnPage("/y-map");
    await I.wait(2);
    await I.saveScreenshot("y-map.png");
    await I.seeVisualDiff("y-map.png", {tolerance: 1, prepareBaseImage: false});
})
