type ResembleHelper = import('codeceptjs-resemblehelper')

declare namespace CodeceptJS {
    interface SupportObject { I: I }
    interface Methods extends Puppeteer, ResembleHelper {}
    interface I extends WithTranslation<Methods> {}
    namespace Translation {
        interface Actions {}
    }
}
