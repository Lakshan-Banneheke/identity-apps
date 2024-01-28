/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import { Context, createContext } from "react";

/**
 * Props interface of {@link UserPreferenceContext}
 */
export interface UserPreferencesContextProps<T> {
    /**
     * User preferences.
     */
    preferences: T;
    /**
     * Function to retrieve a user preference.
     * @param key - The key of the preference to retrieve.
     * @param orgId - Optional organization ID. If provided, the preference for this organization will be retrieved.
     * @returns The preference value.
     */
    getPreferences: (key: string, orgId?: string) => unknown;
    /**
     * Function to update user preferences.
     * @param preferencesToUpdate - The new preferences to update.
     * @param orgId - Optional organization ID. If provided, the preferences for this organization will be updated.
     */
    setPreferences: (preferencesToUpdate: T, orgId?: string) => void;
}

/**
 * Context object for managing the User's preferences.
 */
const UserPreferencesContext: Context<UserPreferencesContextProps<any>> =
    createContext<null | UserPreferencesContextProps<any>>(null);

/**
 * Display name for the UserPreferencesContext.
 */
UserPreferencesContext.displayName = "UserPreferencesContext";

export default UserPreferencesContext;
