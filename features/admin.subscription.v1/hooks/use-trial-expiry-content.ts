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
import { useSelector } from "react-redux";
import { TrialExpiryContentInterface } from "../models/trial-expiry";

/**
 * Reads the copy of the trial expiry wizard off the trial extension of the deployment config. The
 * wizard has no built in copy, so an unconfigured deployment resolves to undefined and the wizard
 * stays hidden rather than rendering a half empty dialog.
 *
 * @returns Configured wizard content, or undefined when the deployment does not configure it.
 */
export const useTrialExpiryContent = (): TrialExpiryContentInterface => {
    return useSelector(
        (state: AppState): TrialExpiryContentInterface =>
            (state?.config?.deployment?.extensions?.trial as {
                expiryNotice?: TrialExpiryContentInterface;
            })?.expiryNotice
    );
};
