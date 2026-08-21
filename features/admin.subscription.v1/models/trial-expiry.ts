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

import { Icon } from "@oxygen-ui/react-icons";

/**
 * Steps of the trial expiry wizard.
 */
export enum TrialExpiryStep {
    CHANGES = 0,
    UPGRADE = 1
}

/**
 * How the body of a summary card is laid out.
 */
export enum TrialExpiryCardVariant {
    LIST = "list",
    PARAGRAPHS = "paragraphs"
}

/**
 * Palette tone used for a summary card's icon tile.
 */
export type TrialExpiryCardTone = "success" | "warning" | "info";

/**
 * Configured content of a single summary card on the first step.
 */
export interface TrialExpirySummaryCardContentInterface {
    /**
     * Lead-in paragraph rendered above the items, if the card has one.
     */
    description?: string;
    /**
     * The card's list items or paragraphs, in display order. Which of the two they render as is
     * decided by the card's variant, not by the configuration.
     */
    items: string[];
    title: string;
}

/**
 * Configured content of the changes summary step.
 */
export interface TrialExpiryChangesContentInterface {
    nothingDeleted: TrialExpirySummaryCardContentInterface;
    nowDisabled: TrialExpirySummaryCardContentInterface;
    staysOnFree: TrialExpirySummaryCardContentInterface;
    subtitle: string;
    title: string;
}

/**
 * Configured content of the paid tier offer panel on the second step.
 */
export interface TrialExpiryOfferContentInterface {
    /**
     * Tier highlights listed with a check mark. Code splits them across the panel's columns.
     */
    features: string[];
    pricing: string;
    title: string;
}

/**
 * Configured content of the upgrade offer step.
 */
export interface TrialExpiryUpgradeContentInterface {
    offer: TrialExpiryOfferContentInterface;
    subtitle: string;
    title: string;
}

/**
 * Copy of the trial expiry wizard, read from the trial extension of the deployment config. Every
 * tier specific string, including the tier names themselves, is authored here rather than derived,
 * so a deployment can offer any tier without a code change.
 */
export interface TrialExpiryContentInterface {
    changes: TrialExpiryChangesContentInterface;
    upgrade: TrialExpiryUpgradeContentInterface;
}

/**
 * Layout of one of the summary cards on the first step. Holds only the parts that are fixed by the
 * design, and picks up its copy from the configured content.
 */
export interface TrialExpirySummaryCardInterface {
    icon: Icon;
    /**
     * Identifies the card in React keys and component IDs.
     */
    key: string;
    /**
     * Picks the card's copy out of the configured content of the step.
     */
    resolveContent: (
        content: TrialExpiryChangesContentInterface
    ) => TrialExpirySummaryCardContentInterface;
    tone: TrialExpiryCardTone;
    variant: TrialExpiryCardVariant;
}

/**
 * Response of the post trial expiry notice endpoint.
 */
export interface TrialExpiryNoticeResponseInterface {
    orgHandle: string;
    /**
     * True only when the most recent trial of the organization has expired, the notice has not
     * been dismissed for the organization, and the organization is on a free tier.
     */
    showNotice: boolean;
    /**
     * End date of the most recent trial in epoch milliseconds. 0 when the organization never
     * held a trial.
     */
    trialEndDate: number;
    /**
     * Id of the trial the notice is about, passed back when dismissing the notice.
     */
    trialId: number;
}

/**
 * Request body of the post trial expiry notice dismissal endpoint.
 */
export interface TrialExpiryNoticeDismissalRequestInterface {
    trialId: number;
}
