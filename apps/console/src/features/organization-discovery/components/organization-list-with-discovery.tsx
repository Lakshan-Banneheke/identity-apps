/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AccessControlConstants, Show } from "@wso2is/access-control";
import { hasRequiredScopes, isFeatureEnabled } from "@wso2is/core/helpers";
import {
    IdentifiableComponentInterface,
    LoadableComponentInterface
} from "@wso2is/core/models";
import {
    DataTable,
    EmptyPlaceholder,
    GenericIcon,
    LinkButton,
    PrimaryButton,
    TableActionsInterface,
    TableColumnInterface
} from "@wso2is/react-components";
import isEmpty from "lodash-es/isEmpty";
import React, { FunctionComponent, ReactElement, ReactNode, SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Header, Icon, SemanticICONS } from "semantic-ui-react";
import {
    AppConstants,
    AppState,
    EventPublisher,
    FeatureConfigInterface,
    UIConstants,
    history
} from "../../core";
import { getEmptyPlaceholderIllustrations } from "../../core/configs/ui";
import { OrganizationIcon } from "../configs";
import { OrganizationManagementConstants } from "../constants";
import { OrganizationDiscoveryInterface, OrganizationListWithDiscoveryInterface } from "../models";

/**
 *
 * Proptypes for the organizations list component.
 */
export interface OrganizationListWithDiscoveryPropsInterface
    extends LoadableComponentInterface,
    IdentifiableComponentInterface {
    /**
     * Default list item limit.
     */
    defaultListItemLimit?: number;
    /**
     * Organization list.
     */
    list: OrganizationListWithDiscoveryInterface;
    /**
     * Callback for the search query clear action.
     */
    onSearchQueryClear?: () => void;
    /**
     * Callback to be fired when clicked on the empty list placeholder action.
     */
    onEmptyListPlaceholderActionClick?: () => void;
    /**
     * Search query for the list.
     */
    searchQuery?: string;
    /**
     * Enable selection styles.
     */
    selection?: boolean;
    /**
     * Show list item actions.
     */
    showListItemActions?: boolean;
    /**
     * Is the list rendered on a portal.
     */
    isRenderedOnPortal?: boolean;
}

/**
 * Organization list component.
 *
 * @param props - Props injected to the component.
 *
 * @returns
 */
export const OrganizationListWithDiscovery: FunctionComponent<OrganizationListWithDiscoveryPropsInterface> = (
    props: OrganizationListWithDiscoveryPropsInterface
): ReactElement => {
    const {
        defaultListItemLimit,
        isLoading,
        list,
        onEmptyListPlaceholderActionClick,
        onSearchQueryClear,
        searchQuery,
        selection,
        showListItemActions,
        isRenderedOnPortal,
        [ "data-componentid" ]: componentId
    } = props;

    const { t } = useTranslation();

    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);
    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);

    const eventPublisher: EventPublisher = EventPublisher.getInstance();

    /**
     * Redirects to the organizations edit page when the edit button is clicked.
     *
     * @param organizationId - Organization id.
     */
    const handleOrganizationEmailDomainEdit = (organizationId: string): void => {
        history.push({
            pathname: AppConstants.getPaths()
                .get("EMAIL_DOMAIN_UPDATE")
                .replace(":id", organizationId)
        });
    };

    /**
     * Resolves data table columns.
     *
     * @returns
     */
    const resolveTableColumns = (): TableColumnInterface[] => {
        return [
            {
                allowToggleVisibility: false,
                dataIndex: "name",
                id: "name",
                key: "name",
                render: (organization: OrganizationDiscoveryInterface): ReactNode => {
                    return (
                        <Header
                            image
                            as="h6"
                            className="header-with-icon"
                            data-componentid={ `${ componentId }-item-heading` }
                        >
                            <GenericIcon
                                defaultIcon
                                relaxed="very"
                                size="micro"
                                shape="rounded"
                                spaced="right"
                                hoverable={ false }
                                icon={ OrganizationIcon }
                            />
                            <Header.Content>
                                { organization.organizationName }
                            </Header.Content>
                        </Header>
                    );
                },
                title: t("console:manage.features.organizations.list.columns.name")
            },
            {
                allowToggleVisibility: false,
                dataIndex: "action",
                id: "actions",
                key: "actions",
                textAlign: "right",
                title: t("console:manage.features.organizations.list.columns.actions")
            }
        ];
    };

    /**
     * Resolves data table actions.
     *
     * @returns
     */
    const resolveTableActions = (): TableActionsInterface[] => {
        if (!showListItemActions) {
            return;
        }

        return [
            {
                "data-componentid": `${ componentId }-item-edit-button`,
                hidden: (): boolean =>
                    !isFeatureEnabled(
                        featureConfig?.organizationDiscovery,
                        OrganizationManagementConstants.FEATURE_DICTIONARY.get("ORGANIZATION_EMAIL_DOMAIN_UPDATE")
                    ),
                icon: (): SemanticICONS => {

                    return !hasRequiredScopes(
                        featureConfig?.organizationDiscovery,
                        featureConfig?.organizationDiscovery?.scopes?.update,
                        allowedScopes
                    )
                        ? "eye"
                        : "pencil alternate";
                },
                onClick: (e: SyntheticEvent, organization: OrganizationDiscoveryInterface): void =>
                    handleOrganizationEmailDomainEdit(organization.organizationId),
                popupText: (): string => {

                    return !hasRequiredScopes(
                        featureConfig?.organizationDiscovery,
                        featureConfig?.organizationDiscovery?.scopes?.update,
                        allowedScopes
                    )
                        ? t("common:view")
                        : t("common:edit");
                },
                renderer: "semantic-icon"
            }
        ];
    };

    /**
     * Resolve the relevant placeholder.
     *
     * @returns
     */
    const showPlaceholders = (): ReactElement => {
        if (searchQuery && (isEmpty(list) || list?.organizations?.length === 0)) {
            return (
                <EmptyPlaceholder
                    action={
                        (<LinkButton onClick={ onSearchQueryClear }>
                            { t("console:manage.placeholders.emptySearchResult.action") }
                        </LinkButton>)
                    }
                    image={ getEmptyPlaceholderIllustrations().emptySearch }
                    imageSize="tiny"
                    title={ t("console:manage.placeholders.emptySearchResult.title") }
                    subtitle={ [
                        t("console:manage.placeholders.emptySearchResult.subtitles.0", {
                            // searchQuery looks like "name co OrganizationName", so we only remove the filter string 
                            // only to get the actual user entered query
                            query: searchQuery.split("organizationName co ")[1]
                        }),
                        t("console:manage.placeholders.emptySearchResult.subtitles.1")
                    ] }
                    data-componentid={ `${ componentId }-empty-search-placeholder` }
                />
            );
        }

        // When the search returns empty.
        if (isEmpty(list) || list?.organizations?.length === 0) {
            return (
                <EmptyPlaceholder
                    className={ !isRenderedOnPortal ? "list-placeholder mr-0" : "" }
                    action={
                        onEmptyListPlaceholderActionClick && (
                            <Show when={ AccessControlConstants.ORGANIZATION_WRITE }>
                                <PrimaryButton
                                    onClick={ () => {
                                        eventPublisher.publish(componentId + "-click-assign-email-domain-button");
                                        onEmptyListPlaceholderActionClick();
                                    } }
                                >
                                    <Icon name="add" />
                                    { t("console:manage.features.organizationDiscovery.placeholders.emptyList.action") }
                                </PrimaryButton>
                            </Show>
                        )
                    }
                    image={ getEmptyPlaceholderIllustrations().newList }
                    imageSize="tiny"
                    subtitle={ t("console:manage.features.organizationDiscoverys.placeholders.emptyList.subtitles") }
                    data-componentid={ `${ componentId }-empty-placeholder` }
                />
            );
        }

        return null;
    };

    return (
        <>
            <DataTable<OrganizationDiscoveryInterface>
                className="organizations-table"
                isLoading={ isLoading }
                loadingStateOptions={ {
                    count: defaultListItemLimit ?? UIConstants.DEFAULT_RESOURCE_LIST_ITEM_LIMIT,
                    imageType: "square"
                } }
                actions={ resolveTableActions() }
                columns={ resolveTableColumns() }
                data={ list?.organizations }
                onRowClick={ (e: SyntheticEvent, organization: OrganizationDiscoveryInterface): void => {
                    handleOrganizationEmailDomainEdit(organization.organizationId);
                }
                }
                placeholders={ showPlaceholders() }
                selectable={ selection }
                showHeader={ false }
                transparent={ !isLoading && showPlaceholders() !== null }
                data-componentid={ componentId }
            />
        </>
    );
};

/**
 * Default props for the component.
 */
OrganizationListWithDiscovery.defaultProps = {
    "data-componentid": "organization-list-with-discovery",
    selection: true,
    showListItemActions: true
};
