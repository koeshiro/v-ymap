Feature("YMap");

Scenario("y-placemark", async ({ I }) => {
    await I.amOnPage("/y-placemark");
    await I.wait(2);
    await I.saveScreenshot("y-placemark.png");
    await I.seeVisualDiff("y-placemark.png", {tolerance: 1, prepareBaseImage: false});
})
