Feature("YMap");

Scenario("y-polygon", async ({ I }) => {
    await I.amOnPage("/y-polygon");
    await I.wait(2);
    await I.saveScreenshot("y-polygon.png");
    await I.seeVisualDiff("y-polygon.png", {tolerance: 3, prepareBaseImage: false});
})
