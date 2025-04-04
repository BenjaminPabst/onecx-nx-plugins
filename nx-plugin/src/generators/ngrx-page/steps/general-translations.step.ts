import { Tree, joinPathFragments, names, updateJson } from '@nx/devkit';
import * as fs from 'fs';
import { deepMerge } from '../../shared/deepMerge';
import { GeneratorStep } from '../../shared/generator.utils';
import { renderJsonFile } from '../../shared/renderJsonFile';
import { PageGeneratorSchema } from '../schema';
import path = require('path');

export class GeneralTranslationsStep
  implements GeneratorStep<PageGeneratorSchema>
{
  process(tree: Tree, options: PageGeneratorSchema): void {
    const folderPath = 'src/assets/i18n/';
    const masterJsonPath = path.resolve(
      __dirname,
      '../input-files/i18n/master.json.template'
    );

    const masterJsonContent = renderJsonFile(masterJsonPath, {
      ...options,
      pageConstantName: names(options.pageName).constantName,
      pageClassName: names(options.pageName).className,
    });

    tree.children(folderPath).forEach((file) => {
      updateJson(tree, joinPathFragments(folderPath, file), (json) => {
        const jsonPath = joinPathFragments(
          path.resolve(__dirname, '../input-files/i18n/'),
          file + '.template'
        );
        let jsonContent = {};
        if (fs.existsSync(jsonPath)) {
          jsonContent = renderJsonFile(jsonPath, {
            ...options,
            pageConstantName: names(options.pageName).constantName,
            pageClassName: names(options.pageName).className,
          });
        }

        json = deepMerge(masterJsonContent, jsonContent, json);

        return json;
      });
    });
  }
  getTitle(): string {
    return 'Adapting Translations';
  }
}
