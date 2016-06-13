const expect = chai.expect;
const locale = require('../lib');
mocha.setup('bdd');

describe('zero-locale', () => {
  it('exists', () => {
    expect(typeof locale).to.equal('object');
  });

  locale.load({
    test: 'hello, %s, welcome to use i18n feature'
  });
  locale.load({
    test: '你好，%s，欢迎使用国际化特性'
  }, 'zh_cn');
  locale.load({
    test: 'こんにちは、%s、国際化機能を試して、ありがとうございます'
  }, 'ja_jp');

  it('default locale', () => {
    expect(locale.translate('test', 'leung'))
      .to.equal('hello, leung, welcome to use i18n feature');
    expect(locale.setLocale('zh_cn').translate('test', 'leung'))
      .to.equal('你好，leung，欢迎使用国际化特性');
    expect(locale.setLocale('ja_jp').translate('test', 'leung'))
      .to.equal('こんにちは、leung、国際化機能を試して、ありがとうございます');
  });
});

mocha.run();
