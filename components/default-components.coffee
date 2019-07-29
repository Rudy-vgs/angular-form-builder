angular.module 'builder.components', ['builder', 'validator.rules', 'pascalprecht.translate']

.config ['$builderProvider', '$translateProvider', ($builderProvider, $translateProvider) ->
    
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage($('html').attr('lang'));
    
    # ----------------------------------------
    # Translations
    # ----------------------------------------  
    
    translations = 
        en:
            group:
                default: 'Default components'
            popover:
                label: 'Label'
                description: 'Description'
                placeholder: 'Placeholder'
                required: 'Required'
                validation: 'Validation'
                options: 'Options'
                save: 'Save'
                cancel: 'Cancel'
                delete: 'Delete'
            textInput:
                label: 'Text input'
                description: 'description'
                placeholder: 'placeholder'
                validationOptions:
                    none: 'none'
                    number: 'number'
                    email: 'email'
                    url: 'url'
            textArea:
                label: 'Text area'
                description: 'description'
                placeholder: 'placeholder'
            checkbox:
                label: 'Checkbox'
                description: 'description'
                placeholder: 'placeholder'
                options:
                    first: 'value one'
                    second: 'value two'
            radio:
                label: 'Radio'
                description: 'description'
                placeholder: 'placeholder'
                options:
                    first: 'value one'
                    second: 'value two'
            select:
                label: 'Select'
                description: 'description'
                placeholder: 'placeholder'
                value: 'Choose a value'
                options:
                    first: 'value one'
                    second: 'value two'   
        fr:         
            group:
                default: 'Composants de base'
            popover:
                label: 'Label'
                description: 'Description'
                placeholder: 'Texte de remplacement'
                required: 'Requis'
                validation: 'Validation'
                options: 'Options'
                save: 'Sauvegarder'
                cancel: 'Annuler'
                delete: 'Supprimer'
            textInput:
                label: 'Champs texte'
                description: 'description'
                placeholder: 'texte de remplacement'
                validationOptions:
                    none: 'aucune'
                    number: 'nombre'
                    email: 'e-mail'
                    url: 'url'
            textArea:
                label: 'Zone de texte'
                description: 'description'
                placeholder: 'texte de remplacement'
            checkbox:
                label: 'Case à cocher'
                description: 'description'
                placeholder: 'texte de remplacement'
                options:
                    first: 'première valeur'
                    second: 'deuxième valeur'
            radio:
                label: 'Bouton radio'
                description: 'description'
                placeholder: 'texte de remplacement'
                options:
                    first: 'première valeur'
                    second: 'deuxième valeur'
            select:
                label: 'Liste déroulante'
                description: 'description'
                placeholder: 'texte de remplacement'
                value: 'Choisissez une valeur'
                options:
                    first: 'première valeur'
                    second: 'deuxième valeur'
    
    # ----------------------------------------
    # Tricky way to get translations
    # ----------------------------------------  
    
    lang = $translateProvider.preferredLanguage();
    
    resolve = (path, obj) ->
        path.split('.').reduce ((prev, curr) ->
            prev[curr]
        ), obj or this
  
    $translate =
        instant: (key) ->
            resolve(key, translations[lang])
    
    # ----------------------------------------
    # Text input
    # ----------------------------------------
    
    $builderProvider.registerComponent 'textInput',
        group: $translate.instant('group.default')
        label: $translate.instant('textInput.label')
        description: $translate.instant('textInput.description')
        placeholder: $translate.instant('textInput.placeholder')
        required: no
        validationOptions: [
            {label: $translate.instant('textInput.validationOptions.none'), rule: '/.*/'}
            {label: $translate.instant('textInput.validationOptions.number'), rule: '[number]'}
            {label: $translate.instant('textInput.validationOptions.email'), rule: '[email]'}
            {label: $translate.instant('textInput.validationOptions.url'), rule: '[url]'}
        ]
        template:
            """
            <div class="form-group">
                <label for="{{formName+index}}" class="col-sm-4 control-label" ng-class="{'fb-required':required}">{{label}}</label>
                <div class="col-sm-8">
                    <input type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" class="form-control" placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.label')}</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.description')}</label>
                    <input type='text' ng-model="description" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.placeholder')}</label>
                    <input type='text' ng-model="placeholder" class='form-control'/>
                </div>
                <div class="checkbox">
                    <label>
                        <input type='checkbox' ng-model="required" />
                        #{$translate.instant('popover.required')}</label>
                </div>
                <div class="form-group" ng-if="validationOptions.length > 0">
                    <label class='control-label'>#{$translate.instant('popover.validation')}</label>
                    <select ng-model="$parent.validation" class='form-control' ng-options="option.rule as option.label for option in validationOptions"></select>
                </div>

                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='#{$translate.instant('popover.save')}'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='#{$translate.instant('popover.cancel')}'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='#{$translate.instant('popover.delete')}'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # Text area
    # ----------------------------------------
    $builderProvider.registerComponent 'textArea',
        group: $translate.instant('group.default')
        label: $translate.instant('textArea.label')
        description: $translate.instant('textArea.description')
        placeholder: $translate.instant('textArea.placeholder')
        required: no
        template:
            """
            <div class="form-group">
                <label for="{{formName+index}}" class="col-sm-4 control-label" ng-class="{'fb-required':required}">{{label}}</label>
                <div class="col-sm-8">
                    <textarea type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" class="form-control" rows='6' placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.label')}</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.description')}</label>
                    <input type='text' ng-model="description" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.placeholder')}</label>
                    <input type='text' ng-model="placeholder" class='form-control'/>
                </div>
                <div class="checkbox">
                    <label>
                        <input type='checkbox' ng-model="required" />
                        #{$translate.instant('popover.required')}</label>
                </div>

                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='#{$translate.instant('popover.save')}'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='#{$translate.instant('popover.cancel')}'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='#{$translate.instant('popover.delete')}'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # checkbox
    # ----------------------------------------
    $builderProvider.registerComponent 'checkbox',
        group: $translate.instant('group.default')
        label: $translate.instant('checkbox.label')
        description: $translate.instant('checkbox.description')
        placeholder: $translate.instant('checkbox.placeholder')
        required: no
        options: [$translate.instant('checkbox.options.first'), $translate.instant('checkbox.options.second')]
        arrayToText: yes
        template:
            """
            <div class="form-group">
                <label for="{{formName+index}}" class="col-sm-4 control-label" ng-class="{'fb-required':required}">{{label}}</label>
                <div class="col-sm-8">
                    <input type='hidden' ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}"/>
                    <div class='checkbox' ng-repeat="item in options track by $index">
                        <label><input type='checkbox' ng-model="$parent.inputArray[$index]" value='{{item}}'/>
                            {{item}}
                        </label>
                    </div>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.label')}</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.description')}</label>
                    <input type='text' ng-model="description" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.options')}</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                </div>
                <div class="checkbox">
                    <label>
                        <input type='checkbox' ng-model="required" />
                        #{$translate.instant('popover.required')}
                    </label>
                </div>

                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='#{$translate.instant('popover.save')}'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='#{$translate.instant('popover.cancel')}'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='#{$translate.instant('popover.delete')}'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # radio
    # ----------------------------------------
    $builderProvider.registerComponent 'radio',
        group: $translate.instant('group.default')
        label: $translate.instant('radio.label')
        description: $translate.instant('radio.description')
        placeholder: $translate.instant('radio.placeholder')
        required: no
        options: [$translate.instant('radio.options.first'), $translate.instant('radio.options.second')]
        template:
            """
            <div class="form-group">
                <label for="{{formName+index}}" class="col-sm-4 control-label" ng-class="{'fb-required':required}">{{label}}</label>
                <div class="col-sm-8">
                    <div class='radio' ng-repeat="item in options track by $index">
                        <label>
                            <input name='{{formName+index}}' ng-model="$parent.inputText" validator-required="{{required}}" validator-group="{{formName}}" value='{{item}}' type='radio'/>
                            {{item}}
                        </label>
                    </div>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.label')}</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.description')}</label>
                    <input type='text' ng-model="description" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.options')}</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                </div>
                <div class="checkbox">
                    <label>
                        <input type='checkbox' ng-model="required" />
                        #{$translate.instant('popover.required')}</label>
                </div>
                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='#{$translate.instant('popover.save')}'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='#{$translate.instant('popover.cancel')}'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='#{$translate.instant('popover.delete')}'/>
                </div>
            </form>
            """

    # ----------------------------------------
    # select
    # ----------------------------------------
    $builderProvider.registerComponent 'select',
        group: $translate.instant('group.default')
        label: $translate.instant('select.label')
        description: $translate.instant('select.description')
        placeholder: $translate.instant('select.placeholder')
        required: no
        options: [$translate.instant('select.options.first'), $translate.instant('select.options.second')]
        template:
            """
            <div class="form-group">
                <label for="{{formName+index}}" class="col-sm-4 control-label" ng-class="{'fb-required':required}">{{label}}</label>
                <div class="col-sm-8">
                    <select ng-options="value for value in options" id="{{formName+index}}" class="form-control" ng-model="inputText" validator-required="{{required}}">
                        
                    </select>
                    <p class='help-block'>{{description}}</p>
                </div>
            </div>
            """
        popoverTemplate:
            """
            <form>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.label')}</label>
                    <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>Descri#{$translate.instant('popover.description')}ption</label>
                    <input type='text' ng-model="description" class='form-control'/>
                </div>
                <div class="form-group">
                    <label class='control-label'>#{$translate.instant('popover.options')}</label>
                    <textarea class="form-control" rows="3" ng-model="optionsText"/>
                </div>
                <div class="checkbox">
                    <label>
                        <input type='checkbox' ng-model="required" />
                        #{$translate.instant('popover.required')}</label>
                </div>
                
                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='#{$translate.instant('popover.save')}'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='#{$translate.instant('popover.cancel')}'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='#{$translate.instant('popover.delete')}'/>
                </div>
            </form>
            """
]
