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

const TRIAL_ENABLED_KEY: string = "isTrialEnabled";
const TRIAL_EXPIRED_KEY: string = "isTrialExpired";

/**
 * Parses the trialDetails SCIM attribute to determine whether the trial banner should be shown.
 * The trialDetails claim stores data as a stringified JSON object with single quotes,
 * e.g. "{'isTrialEnabled': true, 'isTrialExpired': false}".
 *
 * @param trialDetailsRaw - The raw trialDetails string from SCIM2.
 * @returns True if the trial banner should be shown, false otherwise.
 */
export const shouldShowTrialBanner = (
    trialDetailsRaw: string | undefined
): boolean => {
    if (!trialDetailsRaw) {
        return false;
    }

    try {
        const normalized: string = trialDetailsRaw.replace(/'/g, "\"");
        const parsed: Record<string, unknown> = JSON.parse(normalized);

        const isTrialEnabled: boolean = parsed?.[TRIAL_ENABLED_KEY] === true;
        const isTrialExpired: boolean = parsed?.[TRIAL_EXPIRED_KEY] === true;

        return isTrialEnabled && !isTrialExpired;
    } catch (_error: unknown) {
        return false;
    }
};
