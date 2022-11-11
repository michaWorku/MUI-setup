import { defineConfig } from "cypress";
import * as Webpack from "webpack";
import { devServer } from "@cypress/webpack-dev-server";
import { addCucumberPreprocessorPlugin, afterRunHandler } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor"
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild"
import  allureWriter from "@shelex/cypress-allure-plugin/writer"
import webpack from '@cypress/webpack-preprocessor'

const webpackConfig = (
  cypressConfig: Cypress.PluginConfigOptions
): Webpack.Configuration => {
  return {
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "ts-loader",
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.feature$/,
          // "testFiles": "**/*.{feature,features}"
          use: [
            {
              loader: "@badeball/cypress-cucumber-preprocessor/webpack",
              options: cypressConfig,
            },
          ],
        },
      ],
    },
  };
};

export default defineConfig({
  projectId: 'zqdgv9',
  component: {
    // specPattern: "**/*.feature",
    specPattern: '**/*.{feature,features}',
    supportFile: false,
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: "react",
        webpackConfig: webpackConfig(devServerConfig.cypressConfig),
      });
    },
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
      
      await addCucumberPreprocessorPlugin(on, config
      //   , {
      //   omitAfterRunHandler: true,
      // }
      );

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

    //   on(
    //     'file:preprocessor',
    //     webpack({
    //         webpackOptions: {
    //             resolve: { extensions: ['.ts', '.js', '.tsx', '.jsx'] },
    //             module: {
    //                 rules: [
    //                     {
    //                         test: /\.feature$/,
    //                         use: [
    //                             {
    //                                 loader: '@badeball/cypress-cucumber-preprocessor/webpack',
    //                                 options: config
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //     })
    // );
      // on("after:run", (results) => {
      //   console.log("test");
        
      //   afterRunHandler(config);
      //   });

      allureWriter(on, config);
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      // allureResultsPath: "allure-results",
  }
  },
  e2e: {
    // async setupNodeEvents(on, config) {
    //   const bundler = createBundler({
    //     plugins: [createEsbuildPlugin(config)],
    //   });

    //   on("file:preprocessor", bundler);
    //   await addCucumberPreprocessorPlugin(on, config);
    //   allureWriter(on, config);

    //   return config;
    // },
    async setupNodeEvents(on, config) {
        
        await addCucumberPreprocessorPlugin(on, config
        //   , {
        //   omitAfterRunHandler: true,
        // }
        );

        on(
            "file:preprocessor",
            createBundler({
              plugins: [createEsbuildPlugin(config)],
            })
        );
      //   on(
      //     'file:preprocessor',
      //     webpack({
      //         webpackOptions: {
      //             resolve: { extensions: ['.ts', '.js', '.tsx', '.jsx'] },
      //             module: {
      //                 rules: [
      //                     {
      //                         test: /\.feature$/,
      //                         use: [
      //                             {
      //                                 loader: '@badeball/cypress-cucumber-preprocessor/webpack',
      //                                 options: config
      //                             }
      //                         ]
      //                     }
      //                 ]
      //             }
      //         }
      //     })
      // );
        // on("after:run", (results) => {
        //   console.log("test");
          
        //   afterRunHandler(config);
        //   });

        allureWriter(on, config);

        return config
    },
    env: {
      allureReuseAfterSpec: true,
      // allureResultsPath: "allure-results",
  },
    specPattern: "cypress/e2e/features/*.feature",
    // specPattern: 'cypress/component/**/*.{feature,features}',
    baseUrl: "http://localhost:3000/",
    chromeWebSecurity: false
  }
});