'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">VIMS documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AccessDeniedModule.html" data-type="entity-link">AccessDeniedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AccessDeniedModule-5eb3832a28b9cfe011dfe645b2208f91"' : 'data-target="#xs-components-links-module-AccessDeniedModule-5eb3832a28b9cfe011dfe645b2208f91"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AccessDeniedModule-5eb3832a28b9cfe011dfe645b2208f91"' : 'id="xs-components-links-module-AccessDeniedModule-5eb3832a28b9cfe011dfe645b2208f91"' }>
                                        <li class="link">
                                            <a href="components/AccessDeniedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccessDeniedComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AccessDeniedRoutingModule.html" data-type="entity-link">AccessDeniedRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AgenciesModule.html" data-type="entity-link">AgenciesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' : 'data-target="#xs-components-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' : 'id="xs-components-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' }>
                                        <li class="link">
                                            <a href="components/AgenciesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgenciesComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' : 'data-target="#xs-injectables-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' : 'id="xs-injectables-links-module-AgenciesModule-608e2d434eb42fea577349142268bec6"' }>
                                        <li class="link">
                                            <a href="injectables/AgenciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AgenciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AgenciesRoutingModule.html" data-type="entity-link">AgenciesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AgencyContactsModule.html" data-type="entity-link">AgencyContactsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' : 'data-target="#xs-components-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' : 'id="xs-components-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' }>
                                        <li class="link">
                                            <a href="components/AgencyContactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgencyContactsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' : 'data-target="#xs-injectables-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' : 'id="xs-injectables-links-module-AgencyContactsModule-d2faea18065f7844763ba5359fe17a46"' }>
                                        <li class="link">
                                            <a href="injectables/AgenciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AgenciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AgencyContactsRoutingModule.html" data-type="entity-link">AgencyContactsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-7382d067261f169a7901db1ffcc5b3e2"' : 'data-target="#xs-components-links-module-AppModule-7382d067261f169a7901db1ffcc5b3e2"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-7382d067261f169a7901db1ffcc5b3e2"' : 'id="xs-components-links-module-AppModule-7382d067261f169a7901db1ffcc5b3e2"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ClientContactsModule.html" data-type="entity-link">ClientContactsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' : 'data-target="#xs-components-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' : 'id="xs-components-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' }>
                                        <li class="link">
                                            <a href="components/ClientContactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientContactsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' : 'data-target="#xs-injectables-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' : 'id="xs-injectables-links-module-ClientContactsModule-07f9176c50b76200558ea1c7c56afcc7"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ClientContactsRoutingModule.html" data-type="entity-link">ClientContactsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ClientReportsModule.html" data-type="entity-link">ClientReportsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' : 'data-target="#xs-components-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' : 'id="xs-components-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' }>
                                        <li class="link">
                                            <a href="components/ClientReportsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientReportsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' : 'data-target="#xs-injectables-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' : 'id="xs-injectables-links-module-ClientReportsModule-bed7653c5d20fb622fefac174bffb4b1"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ClientReportsRoutingModule.html" data-type="entity-link">ClientReportsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ClientsModule.html" data-type="entity-link">ClientsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' : 'data-target="#xs-components-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' : 'id="xs-components-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' }>
                                        <li class="link">
                                            <a href="components/ClientsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' : 'data-target="#xs-injectables-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' : 'id="xs-injectables-links-module-ClientsModule-5a4fb1407987314339be241fabb529c1"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ClientsRoutingModule.html" data-type="entity-link">ClientsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ContractsModule.html" data-type="entity-link">ContractsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' : 'data-target="#xs-components-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' : 'id="xs-components-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' }>
                                        <li class="link">
                                            <a href="components/ContractsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContractsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' : 'data-target="#xs-injectables-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' : 'id="xs-injectables-links-module-ContractsModule-d417b8f274ab736b6c910b5e98f93691"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContractsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ContractsService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContractsRoutingModule.html" data-type="entity-link">ContractsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' : 'data-target="#xs-components-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' : 'id="xs-components-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' }>
                                        <li class="link">
                                            <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NotificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimelineComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' : 'data-target="#xs-injectables-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' : 'id="xs-injectables-links-module-DashboardModule-7e2ee19fdf7650721c3bc9b68c3f09dc"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ForgotpasswordModule.html" data-type="entity-link">ForgotpasswordModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ForgotpasswordModule-678090adc38cb6777cc9eafa727b9a6b"' : 'data-target="#xs-components-links-module-ForgotpasswordModule-678090adc38cb6777cc9eafa727b9a6b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ForgotpasswordModule-678090adc38cb6777cc9eafa727b9a6b"' : 'id="xs-components-links-module-ForgotpasswordModule-678090adc38cb6777cc9eafa727b9a6b"' }>
                                        <li class="link">
                                            <a href="components/ForgotpasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotpasswordComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ForgotpasswordRoutingModule.html" data-type="entity-link">ForgotpasswordRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/InsurerContactsModule.html" data-type="entity-link">InsurerContactsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' : 'data-target="#xs-components-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' : 'id="xs-components-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' }>
                                        <li class="link">
                                            <a href="components/InsurerContactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InsurerContactsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' : 'data-target="#xs-injectables-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' : 'id="xs-injectables-links-module-InsurerContactsModule-24754b529d4855ca44f4f962930df8cc"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InsurersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>InsurersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/InsurerContactsRoutingModule.html" data-type="entity-link">InsurerContactsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/InsurersModule.html" data-type="entity-link">InsurersModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' : 'data-target="#xs-components-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' : 'id="xs-components-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' }>
                                        <li class="link">
                                            <a href="components/InsurersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">InsurersComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' : 'data-target="#xs-injectables-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' : 'id="xs-injectables-links-module-InsurersModule-e6463a9b988b2e406ab7220c43e79a97"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InsurersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>InsurersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/InsurersRoutingModule.html" data-type="entity-link">InsurersRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/LayoutModule.html" data-type="entity-link">LayoutModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' : 'data-target="#xs-components-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' : 'id="xs-components-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' }>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' : 'data-target="#xs-injectables-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' : 'id="xs-injectables-links-module-LayoutModule-bcfea5fd4c6feca55f3a41f08108da6f"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>RolesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LayoutRoutingModule.html" data-type="entity-link">LayoutRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/LienholderContactsModule.html" data-type="entity-link">LienholderContactsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' : 'data-target="#xs-components-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' : 'id="xs-components-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' }>
                                        <li class="link">
                                            <a href="components/LienholderContactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LienholderContactsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' : 'data-target="#xs-injectables-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' : 'id="xs-injectables-links-module-LienholderContactsModule-31c737553df3af44c466700a857423f8"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LienholdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LienholdersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LienholderContactsRoutingModule.html" data-type="entity-link">LienholderContactsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/LienholdersModule.html" data-type="entity-link">LienholdersModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' : 'data-target="#xs-components-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' : 'id="xs-components-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' }>
                                        <li class="link">
                                            <a href="components/LienholdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LienholdersComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' : 'data-target="#xs-injectables-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' : 'id="xs-injectables-links-module-LienholdersModule-e0fbace5470b8b6343a6185a17026458"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LienholdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LienholdersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LienholdersRoutingModule.html" data-type="entity-link">LienholdersRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' : 'data-target="#xs-components-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' : 'id="xs-components-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' }>
                                        <li class="link">
                                            <a href="components/AlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' : 'data-target="#xs-injectables-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' : 'id="xs-injectables-links-module-LoginModule-02cc42efb3bf09b5007808c84319216a"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LoginService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/NotFoundModule.html" data-type="entity-link">NotFoundModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NotFoundModule-c50c665373345443f67e0892bef64b9a"' : 'data-target="#xs-components-links-module-NotFoundModule-c50c665373345443f67e0892bef64b9a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NotFoundModule-c50c665373345443f67e0892bef64b9a"' : 'id="xs-components-links-module-NotFoundModule-c50c665373345443f67e0892bef64b9a"' }>
                                        <li class="link">
                                            <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/NotFoundRoutingModule.html" data-type="entity-link">NotFoundRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/PageHeaderModule.html" data-type="entity-link">PageHeaderModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PageHeaderModule-4bd3ae4168e7f5d6055d5261c6e4deed"' : 'data-target="#xs-components-links-module-PageHeaderModule-4bd3ae4168e7f5d6055d5261c6e4deed"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PageHeaderModule-4bd3ae4168e7f5d6055d5261c6e4deed"' : 'id="xs-components-links-module-PageHeaderModule-4bd3ae4168e7f5d6055d5261c6e4deed"' }>
                                        <li class="link">
                                            <a href="components/PageHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageHeaderComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PoliciesModule.html" data-type="entity-link">PoliciesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' : 'data-target="#xs-components-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' : 'id="xs-components-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' }>
                                        <li class="link">
                                            <a href="components/PoliciesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PoliciesComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' : 'data-target="#xs-injectables-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' : 'id="xs-injectables-links-module-PoliciesModule-2e14243f3aaa37bca5a413a8ac8130b7"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PoliciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PoliciesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PoliciesRoutingModule.html" data-type="entity-link">PoliciesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/PolicyReportsModule.html" data-type="entity-link">PolicyReportsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' : 'data-target="#xs-components-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' : 'id="xs-components-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' }>
                                        <li class="link">
                                            <a href="components/PolicyReportsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PolicyReportsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' : 'data-target="#xs-injectables-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' : 'id="xs-injectables-links-module-PolicyReportsModule-b89616764b1fcff865fd822c6f70469e"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PoliciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PoliciesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PolicyReportsRoutingModule.html" data-type="entity-link">PolicyReportsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/RolesModule.html" data-type="entity-link">RolesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-RolesModule-f15683880da327454255405dfb74d024"' : 'data-target="#xs-components-links-module-RolesModule-f15683880da327454255405dfb74d024"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-RolesModule-f15683880da327454255405dfb74d024"' : 'id="xs-components-links-module-RolesModule-f15683880da327454255405dfb74d024"' }>
                                        <li class="link">
                                            <a href="components/RolesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RolesComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-RolesModule-f15683880da327454255405dfb74d024"' : 'data-target="#xs-injectables-links-module-RolesModule-f15683880da327454255405dfb74d024"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-RolesModule-f15683880da327454255405dfb74d024"' : 'id="xs-injectables-links-module-RolesModule-f15683880da327454255405dfb74d024"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>RolesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/RolesRoutingModule.html" data-type="entity-link">RolesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ServerErrorModule.html" data-type="entity-link">ServerErrorModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ServerErrorModule-ae576b7a360e0dd777f0eedccfea2786"' : 'data-target="#xs-components-links-module-ServerErrorModule-ae576b7a360e0dd777f0eedccfea2786"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ServerErrorModule-ae576b7a360e0dd777f0eedccfea2786"' : 'id="xs-components-links-module-ServerErrorModule-ae576b7a360e0dd777f0eedccfea2786"' }>
                                        <li class="link">
                                            <a href="components/ServerErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServerErrorComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ServerErrorRoutingModule.html" data-type="entity-link">ServerErrorRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/SharedPipesModule.html" data-type="entity-link">SharedPipesModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/StatModule.html" data-type="entity-link">StatModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-StatModule-caffd03ba301a0412391a1d538dcb25b"' : 'data-target="#xs-components-links-module-StatModule-caffd03ba301a0412391a1d538dcb25b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-StatModule-caffd03ba301a0412391a1d538dcb25b"' : 'id="xs-components-links-module-StatModule-caffd03ba301a0412391a1d538dcb25b"' }>
                                        <li class="link">
                                            <a href="components/StatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' : 'data-target="#xs-components-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' : 'id="xs-components-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' }>
                                        <li class="link">
                                            <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' : 'data-target="#xs-injectables-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' : 'id="xs-injectables-links-module-UsersModule-09f0aff8a83f13809011206abedb80b6"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UsersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersRoutingModule.html" data-type="entity-link">UsersRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/VehicleContactsModule.html" data-type="entity-link">VehicleContactsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' : 'data-target="#xs-components-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' : 'id="xs-components-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' }>
                                        <li class="link">
                                            <a href="components/VehicleContactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">VehicleContactsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' : 'data-target="#xs-injectables-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' : 'id="xs-injectables-links-module-VehicleContactsModule-53cd555b61488af3f1f08684f655dbee"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PoliciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PoliciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VehiclesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>VehiclesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/VehicleContactsRoutingModule.html" data-type="entity-link">VehicleContactsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/VehicleTransactionLogsModule.html" data-type="entity-link">VehicleTransactionLogsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' : 'data-target="#xs-components-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' : 'id="xs-components-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' }>
                                        <li class="link">
                                            <a href="components/VehicleTransactionLogsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">VehicleTransactionLogsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' : 'data-target="#xs-injectables-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' : 'id="xs-injectables-links-module-VehicleTransactionLogsModule-969a85240f84a84c1c1ef3f874744306"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VehiclesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>VehiclesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/VehicleTransactionLogsRoutingModule.html" data-type="entity-link">VehicleTransactionLogsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/VehiclesModule.html" data-type="entity-link">VehiclesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' : 'data-target="#xs-components-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' : 'id="xs-components-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' }>
                                        <li class="link">
                                            <a href="components/VehiclesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">VehiclesComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' : 'data-target="#xs-injectables-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' : 'id="xs-injectables-links-module-VehiclesModule-d9f180b7b7c58f736f3c3a9397dfcc9a"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PoliciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PoliciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VehiclesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>VehiclesService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/VehiclesRoutingModule.html" data-type="entity-link">VehiclesRoutingModule</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ChatComponent.html" data-type="entity-link">ChatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationComponent.html" data-type="entity-link">NotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimelineComponent.html" data-type="entity-link">TimelineComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/SerialnoValidator.html" data-type="entity-link">SerialnoValidator</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
