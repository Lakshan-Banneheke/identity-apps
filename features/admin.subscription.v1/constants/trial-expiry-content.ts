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
    TrialExpirySummaryCardInterface
} from "../models/trial-expiry";

/**
 * The three "what changed" cards on the first step, in display order.
 */
export const TRIAL_EXPIRY_SUMMARY_CARDS: TrialExpirySummaryCardInterface[] = [
    {
        icon: CheckIcon,
        itemKeys: [
            "console:common.trialExpiry.changes.staysOnFree.items.monthlyUsers",
            "console:common.trialExpiry.changes.staysOnFree.items.m2mTokens",
            "console:common.trialExpiry.changes.staysOnFree.items.agentIdTokens",
            "console:common.trialExpiry.changes.staysOnFree.items.applications",
            "console:common.trialExpiry.changes.staysOnFree.items.organizations",
            "console:common.trialExpiry.changes.staysOnFree.items.socialLogin"
        ],
        key: "stays-on-free",
        titleKey: "console:common.trialExpiry.changes.staysOnFree.title",
        tone: "success",
        variant: TrialExpiryCardVariant.LIST
    },
    {
        descriptionKey: "console:common.trialExpiry.changes.nowDisabled.description",
        icon: BanIcon,
        itemKeys: [
            "console:common.trialExpiry.changes.nowDisabled.items.applications",
            "console:common.trialExpiry.changes.nowDisabled.items.organizations",
            "console:common.trialExpiry.changes.nowDisabled.items.enterpriseConnections",
            "console:common.trialExpiry.changes.nowDisabled.items.preFlowExtensions",
            "console:common.trialExpiry.changes.nowDisabled.items.webhooks",
            "console:common.trialExpiry.changes.nowDisabled.items.remoteUserstores"
        ],
        key: "now-disabled",
        titleKey: "console:common.trialExpiry.changes.nowDisabled.title",
        tone: "warning",
        variant: TrialExpiryCardVariant.LIST
    },
    {
        icon: DatabaseIcon,
        itemKeys: [
            "console:common.trialExpiry.changes.nothingDeleted.items.dataPreserved",
            "console:common.trialExpiry.changes.nothingDeleted.items.continueAnytime",
            "console:common.trialExpiry.changes.nothingDeleted.items.resourcesStayDisabled"
        ],
        key: "nothing-deleted",
        titleKey: "console:common.trialExpiry.changes.nothingDeleted.title",
        tone: "info",
        variant: TrialExpiryCardVariant.PARAGRAPHS
    }
];

/**
 * Paid tier highlights on the second step, grouped into the two columns of the offer panel.
 */
export const TRIAL_EXPIRY_UPGRADE_FEATURE_COLUMNS: string[][] = [
    [
        "console:common.trialExpiry.upgrade.offer.features.monthlyActiveUsers",
        "console:common.trialExpiry.upgrade.offer.features.agentIdTokens",
        "console:common.trialExpiry.upgrade.offer.features.enterpriseSso"
    ],
    [
        "console:common.trialExpiry.upgrade.offer.features.m2mTokens",
        "console:common.trialExpiry.upgrade.offer.features.unlimitedApplications",
        "console:common.trialExpiry.upgrade.offer.features.customDomains"
    ]
];
