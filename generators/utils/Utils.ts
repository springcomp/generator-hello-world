import * as _ from "lodash";

import askName = require("inquirer-npm-name");
import inquirer = require("inquirer");
import path = require("path");

export class ModuleName {
  scopeName: string;
  localName: string;
  repositoryName: string;
}

export class Utils {

  public static parseScopedName(name: string): ModuleName {
    const nameFragments = name.split('/');
    const parseResult: ModuleName = {
      scopeName: '',
      localName: name,
      repositoryName: '',
    };

    if (nameFragments.length > 1) {
      parseResult.scopeName = nameFragments[0];
      parseResult.localName = nameFragments[1];
    }

    return parseResult;
  }

  public static makeModuleName(name: string, repositoryName: string): ModuleName {

    const moduleName: ModuleName = {
      localName: '',
      scopeName: '',
      repositoryName: repositoryName,
    };

    if (name.startsWith('@')) {
      const scopedName = Utils.parseScopedName(name);
      Object.assign(moduleName, scopedName);
    } else {
      moduleName.localName = name;
    }

    if (!moduleName.repositoryName) {
      moduleName.repositoryName = moduleName.localName;
    }

    return moduleName;
  }

  public static async askForProjectName(): Promise<{ [key: string]: string }> {
    return await askName(
      {
        name: 'name',
        message: 'Project name',
        default: path.basename(process.cwd()),
      },
      inquirer
    );
  }
}