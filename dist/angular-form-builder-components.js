(function() {
  angular.module('builder.components', ['builder', 'validator.rules', 'pascalprecht.translate']).config([
    '$builderProvider', '$translateProvider', function($builderProvider, $translateProvider) {
      var $translate, lang, resolve, translations;
      $translateProvider.useSanitizeValueStrategy('escaped');
      $translateProvider.preferredLanguage($('html').attr('lang'));
      translations = {
        en: {
          group: {
            "default": 'Default components'
          },
          popover: {
            label: 'Label',
            description: 'Description',
            placeholder: 'Placeholder',
            required: 'Required',
            validation: 'Validation',
            options: 'Options',
            save: 'Save',
            cancel: 'Cancel',
            "delete": 'Delete'
          },
          textInput: {
            label: 'Text input',
            description: 'description',
            placeholder: 'placeholder',
            validationOptions: {
              none: 'none',
              number: 'number',
              email: 'email',
              url: 'url'
            }
          },
          textArea: {
            label: 'Text area',
            description: 'description',
            placeholder: 'placeholder'
          },
          checkbox: {
            label: 'Checkbox',
            description: 'description',
            placeholder: 'placeholder',
            options: {
              first: 'value one',
              second: 'value two'
            }
          },
          radio: {
            label: 'Radio',
            description: 'description',
            placeholder: 'placeholder',
            options: {
              first: 'value one',
              second: 'value two'
            }
          },
          select: {
            label: 'Select',
            description: 'description',
            placeholder: 'placeholder',
            value: 'Choose a value',
            options: {
              first: 'value one',
              second: 'value two'
            }
          }
        },
        fr: {
          group: {
            "default": 'Composants de base'
          },
          popover: {
            label: 'Label',
            description: 'Description',
            placeholder: 'Texte de remplacement',
            required: 'Requis',
            validation: 'Validation',
            options: 'Options',
            save: 'Sauvegarder',
            cancel: 'Annuler',
            "delete": 'Supprimer'
          },
          textInput: {
            label: 'Champs texte',
            description: 'description',
            placeholder: 'texte de remplacement',
            validationOptions: {
              none: 'aucune',
              number: 'nombre',
              email: 'e-mail',
              url: 'url'
            }
          },
          textArea: {
            label: 'Zone de texte',
            description: 'description',
            placeholder: 'texte de remplacement'
          },
          checkbox: {
            label: 'Case à cocher',
            description: 'description',
            placeholder: 'texte de remplacement',
            options: {
              first: 'première valeur',
              second: 'deuxième valeur'
            }
          },
          radio: {
            label: 'Bouton radio',
            description: 'description',
            placeholder: 'texte de remplacement',
            options: {
              first: 'première valeur',
              second: 'deuxième valeur'
            }
          },
          select: {
            label: 'Liste déroulante',
            description: 'description',
            placeholder: 'texte de remplacement',
            value: 'Choisissez une valeur',
            options: {
              first: 'première valeur',
              second: 'deuxième valeur'
            }
          }
        }
      };
      lang = $translateProvider.preferredLanguage();
      resolve = function(path, obj) {
        return path.split('.').reduce((function(prev, curr) {
          return prev[curr];
        }), obj || this);
      };
      $translate = {
        instant: function(key) {
          return resolve(key, translations[lang]);
        }
      };
      $builderProvider.registerComponent('textInput', {
        group: $translate.instant('group.default'),
        label: $translate.instant('textInput.label'),
        description: $translate.instant('textInput.description'),
        placeholder: $translate.instant('textInput.placeholder'),
        required: false,
        validationOptions: [
          {
            label: $translate.instant('textInput.validationOptions.none'),
            rule: '/.*/'
          }, {
            label: $translate.instant('textInput.validationOptions.number'),
            rule: '[number]'
          }, {
            label: $translate.instant('textInput.validationOptions.email'),
            rule: '[email]'
          }, {
            label: $translate.instant('textInput.validationOptions.url'),
            rule: '[url]'
          }
        ],
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-8\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.label')) + "</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.description')) + "</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.placeholder')) + "</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            " + ($translate.instant('popover.required')) + "</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>" + ($translate.instant('popover.validation')) + "</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='" + ($translate.instant('popover.save')) + "'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='" + ($translate.instant('popover.cancel')) + "'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='" + ($translate.instant('popover.delete')) + "'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('textArea', {
        group: $translate.instant('group.default'),
        label: $translate.instant('textArea.label'),
        description: $translate.instant('textArea.description'),
        placeholder: $translate.instant('textArea.placeholder'),
        required: false,
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-8\">\n        <textarea type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control\" rows='6' placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.label')) + "</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.description')) + "</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.placeholder')) + "</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            " + ($translate.instant('popover.required')) + "</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='" + ($translate.instant('popover.save')) + "'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='" + ($translate.instant('popover.cancel')) + "'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='" + ($translate.instant('popover.delete')) + "'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('checkbox', {
        group: $translate.instant('group.default'),
        label: $translate.instant('checkbox.label'),
        description: $translate.instant('checkbox.description'),
        placeholder: $translate.instant('checkbox.placeholder'),
        required: false,
        options: [$translate.instant('checkbox.options.first'), $translate.instant('checkbox.options.second')],
        arrayToText: true,
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-8\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class='checkbox' ng-repeat=\"item in options track by $index\">\n            <label><input type='checkbox' ng-model=\"$parent.inputArray[$index]\" value='{{item}}'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.label')) + "</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.description')) + "</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.options')) + "</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            " + ($translate.instant('popover.required')) + "\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='" + ($translate.instant('popover.save')) + "'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='" + ($translate.instant('popover.cancel')) + "'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='" + ($translate.instant('popover.delete')) + "'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('radio', {
        group: $translate.instant('group.default'),
        label: $translate.instant('radio.label'),
        description: $translate.instant('radio.description'),
        placeholder: $translate.instant('radio.placeholder'),
        required: false,
        options: [$translate.instant('radio.options.first'), $translate.instant('radio.options.second')],
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-8\">\n        <div class='radio' ng-repeat=\"item in options track by $index\">\n            <label>\n                <input name='{{formName+index}}' ng-model=\"$parent.inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" value='{{item}}' type='radio'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.label')) + "</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.description')) + "</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.options')) + "</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            " + ($translate.instant('popover.required')) + "</label>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='" + ($translate.instant('popover.save')) + "'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='" + ($translate.instant('popover.cancel')) + "'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='" + ($translate.instant('popover.delete')) + "'/>\n    </div>\n</form>"
      });
      return $builderProvider.registerComponent('select', {
        group: $translate.instant('group.default'),
        label: $translate.instant('select.label'),
        description: $translate.instant('select.description'),
        placeholder: $translate.instant('select.placeholder'),
        required: false,
        options: [$translate.instant('select.options.first'), $translate.instant('select.options.second')],
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-8\">\n        <select id=\"{{formName+index}}\" class=\"form-control\" ng-model=\"inputText\" validator-required=\"{{required}}\">\n            <option value=\"''\">" + ($translate.instant('select.value')) + "</option>\n            <option ng-repeat=\"value for value in options\" value=\"{{value}}\">{{value}}</option>\n        </select>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.label')) + "</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.description')) + "</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>" + ($translate.instant('popover.options')) + "</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            " + ($translate.instant('popover.required')) + "</label>\n    </div>\n    \n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='" + ($translate.instant('popover.save')) + "'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='" + ($translate.instant('popover.cancel')) + "'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='" + ($translate.instant('popover.delete')) + "'/>\n    </div>\n</form>"
      });
    }
  ]);

}).call(this);
