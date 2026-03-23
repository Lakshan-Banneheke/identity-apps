/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import { AppState } from "@wso2is/admin.core.v1/store";
import {
    useGetCurrentOrganizationType
} from "@wso2is/admin.organizations.v1/hooks/use-get-organization-type";
import { useUsersList } from "@wso2is/admin.users.v1/api/users";
import { ProfileConstants } from "@wso2is/core/constants";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { shouldShowTrialBanner as checkTrialBanner } from "../utils/parse-trial-details";

/**
 * SCIM2 attributes to request from the Users list endpoint.
 */
const SCIM_ATTRIBUTES: string = [
    `${ProfileConstants.SCIM2_SYSTEM_USER_SCHEMA}.trialDetails`
].join(",");

/**
 * Return type for the useTrialStatus hook.
 */
interface UseTrialStatusReturn {
    isLoading: boolean;
    shouldShowTrialBanner: boolean;
}

/**
 * Determines whether the free trial banner should be shown to the current user
 * by fetching the trialDetails SCIM attribute.
 */
export const useTrialStatus = (): UseTrialStatusReturn => {
    const userName: string = useSelector(
        (state: AppState) => state.profile.profileInfo.userName
    );

    const { isFirstLevelOrganization } = useGetCurrentOrganizationType();
    const isFirstLevelOrg: boolean = isFirstLevelOrganization();

    const shouldFetch: boolean =
        !!userName &&
        isFirstLevelOrg;

    const {
        data: userListData,
        isLoading: isUserListLoading
    } = useUsersList(
        1,
        1,
        `userName eq ${userName}`,
        SCIM_ATTRIBUTES,
        "PRIMARY",
        "groups",
        shouldFetch
    );

    const currentUser: Record<string, unknown> | undefined =
        userListData?.Resources?.[0] as unknown as Record<string, unknown> | undefined;

    const systemSchemaData: Record<string, unknown> | undefined = currentUser
        ?.[ProfileConstants.SCIM2_SYSTEM_USER_SCHEMA] as Record<string, unknown> | undefined;

    const trialDetailsRaw: string | undefined =
        systemSchemaData?.trialDetails as string | undefined;

    const shouldShowBanner: boolean = useMemo((): boolean => {
        if (!shouldFetch || !currentUser) {
            return false;
        }

        return checkTrialBanner(trialDetailsRaw);
    }, [ shouldFetch, currentUser, trialDetailsRaw ]);

    const isLoading: boolean = shouldFetch && isUserListLoading;

    return {
        isLoading,
        shouldShowTrialBanner: shouldShowBanner
    };
};
