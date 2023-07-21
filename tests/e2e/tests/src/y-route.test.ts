Feature("YMap");

Scenario("y-rout", async ({ I }) => {
    await I.amOnPage("/y-rout");
    await I.wait(2);
    await I.saveScreenshot("y-rout.png");
    await I.seeVisualDiff("y-rout.png", { tolerance: 3, prepareBaseImage: false });
})
