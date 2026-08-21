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

import { ComponentType } from "react";

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

export interface TrialExpirySummaryCardInterface {
    /**
     * i18n key of the lead-in paragraph rendered above the items, if the card has one.
     */
    descriptionKey?: string;
    icon: ComponentType<{ size?: number }>;
    /**
     * i18n keys of the card's list items or paragraphs, in display order.
     */
    itemKeys: string[];
    /**
     * Identifies the card in React keys and component IDs.
     */
    key: string;
    titleKey: string;
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
