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

import Box from "@oxygen-ui/react/Box";
import Link from "@oxygen-ui/react/Link/Link";
import Typography from "@oxygen-ui/react/Typography";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { useTrialDetails } from "../hooks/use-trial-details";

/**
 * Props interface for the FreeTrialBanner component.
 */
type FreeTrialBannerPropsInterface = IdentifiableComponentInterface;

/**
 * Banner component that displays trial status information
 * when the tenant has an active free trial.
 *
 * @param props - Component props.
 * @returns Free trial banner component.
 */
const FreeTrialBanner: FunctionComponent<FreeTrialBannerPropsInterface> = (
    props: FreeTrialBannerPropsInterface
): ReactElement => {
    const {
        ["data-componentid"]: componentId = "free-trial-banner"
    } = props;

    const { tenantHasTrial, daysRemaining } = useTrialDetails();

    if (!tenantHasTrial) {
        return null;
    }

    return (
        <Box
            sx={ {
                "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(-8px)" },
                    to: { opacity: 1, transform: "translateY(0)" }
                },
                alignItems: "center",
                animation: "fadeIn 0.3s ease-out forwards",
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                display: "flex",
                gap: 1.5,
                mb: 2,
                mt: 1,
                px: 2.5,
                py: 1.5
            } }
            data-componentid={ componentId }
        >
            <Typography variant="body2" color="text.secondary">
                You&apos;re on a free trial with { " " }
                <strong>{ daysRemaining }</strong>{ " " }
                { daysRemaining === 1 ? "day" : "days" } remaining. { " " }
                Take this time to try out capabilities not available on the Free plan. { " " }
                <Link
                    href="https://console.asgardeo.io/t/carbon.super/billing"
                    target="_blank"
                    rel="noreferrer"
                    underline="always"
                >
                    Upgrade
                </Link>
                { " " }whenever you&apos;re ready.
            </Typography>
        </Box>
    );
};

export default FreeTrialBanner;
