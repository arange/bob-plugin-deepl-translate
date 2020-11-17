const { join } = require('path')
const AdmZip = require('adm-zip')
const fs = require('fs-extra')
const { promisify } = require('util')

function generateInfo() {
  return {
    identifier: 'dev.royli.bob-plugin-deepl-translate',
    category: 'translate',
    name: 'DeepL Translate',
    summary: '',
    icon: '115',
    author: 'Roy Li',
    homepage: 'https://royli.dev',
    minBobVersion: '0.5.0',
    options: [
      {
        identifier: 'token',
        type: 'text',
        title: 'Token',
      },
      {
        identifier: 'provider',
        type: 'menu',
        title: 'API',
        defaultValue: 'deepl',
        menuValues: [
          {
            title: 'DeepL',
            value: 'deepl',
          },
          {
            title: 'Sub DeepL',
            value: 'sub-deepl',
          },
        ],
      },
      {
        identifier: 'formality',
        type: 'menu',
        title: 'Formality',
        defaultValue: 'default',
        menuValues: [
          {
            title: 'Default',
            value: 'default',
          },
          {
            title: 'More formal',
            value: 'more',
          },
          {
            title: 'More informal',
            value: 'less',
          },
        ],
      },
    ],
  }
}

async function main() {
  const pkgName = 'bob-plugin-deepl-translate'
  const version = require('../package.json').version
  const buildDir = join(__dirname, '../build')
  const releaseDir = join(__dirname, '../release')
  const pkg = join(releaseDir, `${pkgName}-v${version}.bobplugin`)
  const info = {
    ...generateInfo(),
    version,
    appcast: '',
  }

  await fs.writeJson(join(buildDir, 'info.json'), info)

  const zip = new AdmZip()
  zip.addLocalFolder(buildDir)
  await promisify(zip.writeZip)(pkg)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
