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

import { BanIcon, CheckIcon, DatabaseIcon } from "@oxygen-ui/react-icons";
import {
    TrialExpiryCardVariant,
    TrialExpiryChangesContentInterface,
    TrialExpirySummaryCardContentInterface,
    TrialExpirySummaryCardInterface
} from "../models/trial-expiry";

/**
 * Layout of the three "what changed" cards on the first step, in display order. The icon, tone and
 * body layout of each card are fixed by the design; only their copy comes from the deployment
 * config, through the resolver of each card.
 */
export const TRIAL_EXPIRY_SUMMARY_CARDS: TrialExpirySummaryCardInterface[] = [
    {
        icon: CheckIcon,
        key: "stays-on-free",
        resolveContent: (
            content: TrialExpiryChangesContentInterface
        ): TrialExpirySummaryCardContentInterface => content?.staysOnFree,
        tone: "success",
        variant: TrialExpiryCardVariant.LIST
    },
    {
        icon: BanIcon,
        key: "now-disabled",
        resolveContent: (
            content: TrialExpiryChangesContentInterface
        ): TrialExpirySummaryCardContentInterface => content?.nowDisabled,
        tone: "warning",
        variant: TrialExpiryCardVariant.LIST
    },
    {
        icon: DatabaseIcon,
        key: "nothing-deleted",
        resolveContent: (
            content: TrialExpiryChangesContentInterface
        ): TrialExpirySummaryCardContentInterface => content?.nothingDeleted,
        tone: "info",
        variant: TrialExpiryCardVariant.PARAGRAPHS
    }
];

/**
 * Number of columns the configured tier highlights are spread across in the offer panel on the
 * second step.
 */
export const TRIAL_EXPIRY_UPGRADE_FEATURE_COLUMN_COUNT: number = 2;
