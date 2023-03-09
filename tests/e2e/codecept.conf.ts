import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  fullPromiseBased: true,
  tests: './tests/src/*.test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://127.0.0.1:3000',
      show: true,
      browser: 'chromium'
    },
    ResembleHelper: {
      require: "codeceptjs-resemblehelper",
      screenshotFolder: "./tests/screenshots/output/",
      baseFolder: "./tests/screenshots/base/",
      diffFolder: "./tests/screenshots/diff/",
      prepareBaseImage: true,
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'e2e'
}
