Feature("YMap");

Scenario("y-circle", async ({ I }) => {
    await I.amOnPage("/y-circle");
    await I.wait(2);
    await I.saveScreenshot("y-circle.png");
    await I.seeVisualDiff("y-circle.png", {tolerance: 3, prepareBaseImage: false});
})
