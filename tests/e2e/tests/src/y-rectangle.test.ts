Feature("YMap");

Scenario("y-rectangle", async ({ I }) => {
    await I.amOnPage("/y-rectangle");
    await I.wait(2);
    await I.saveScreenshot("y-rectangle.png");
    await I.seeVisualDiff("y-rectangle.png", {tolerance: 1, prepareBaseImage: false});
})
