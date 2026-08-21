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

import { Theme, alpha, styled } from "@mui/material/styles";
import Box from "@oxygen-ui/react/Box";
import DialogContent, { DialogContentProps } from "@oxygen-ui/react/DialogContent";
import Paper from "@oxygen-ui/react/Paper";
import { FunctionComponent } from "react";

/**
 * Height floor shared by both step bodies. Sized to the taller of the two (the upgrade
 * step) so the dialog does not resize as the user moves between steps.
 */
const STEP_CONTENT_MIN_HEIGHT: number = 370;

/**
 * Body of a wizard step. Both steps use this so they render at the same height, with their
 * content centred in whatever slack the minimum height leaves.
 */
export const TrialExpiryStepContent: FunctionComponent<DialogContentProps> = styled(DialogContent)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: STEP_CONTENT_MIN_HEIGHT
}));

/**
 * One of the three "what changed" cards on the first step.
 */
export const TrialExpirySummaryCard: typeof Paper = styled(Paper)(({ theme }: { theme: Theme }) => ({
    border: `1px solid ${ theme.palette.divider }`,
    borderRadius: theme.shape.borderRadius * 2,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: "100%",
    padding: theme.spacing(3)
}));

/**
 * Square tile behind a summary card's icon. The tone specific background and foreground
 * colours are applied by the consumer, since they vary per card.
 */
export const TrialExpiryIconTile: typeof Box = styled(Box)(({ theme }: { theme: Theme }) => ({
    alignItems: "center",
    borderRadius: theme.shape.borderRadius * 1.5,
    display: "flex",
    flexShrink: 0,
    height: 40,
    justifyContent: "center",
    width: 40
}));

/**
 * Bulleted list of resource types inside a summary card.
 */
export const TrialExpiryItemList: typeof Box = styled(Box)(({ theme }: { theme: Theme }) => ({
    "& li:not(:last-of-type)": {
        marginBottom: theme.spacing(1)
    },
    margin: 0,
    paddingLeft: theme.spacing(2.5)
}));

/**
 * Tinted panel that frames the upgrade offer on the second step.
 */
export const TrialExpiryOfferPanel: typeof Paper = styled(Paper)(({ theme }: { theme: Theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    border: `1px solid ${ alpha(theme.palette.primary.main, 0.24) }`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(4)
}));

/**
 * Leading check mark of a single upgrade benefit. Nudged down so it aligns with the
 * cap height of the adjacent text rather than its line box.
 */
export const TrialExpiryFeatureCheck: typeof Box = styled(Box)(({ theme }: { theme: Theme }) => ({
    alignItems: "center",
    color: theme.palette.success.main,
    display: "flex",
    flexShrink: 0,
    paddingTop: theme.spacing(0.375)
}));
