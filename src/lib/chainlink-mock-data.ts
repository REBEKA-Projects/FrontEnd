// ─── Chainlink CRE Mock Data ───
// Mock data for the Chainlink Runtime Environment workflow verification panel.
// Used for the hackathon demo video. Replace with real CRE data in production.

export type OracleVerification = {
    status: 'VERIFIED' | 'PENDING' | 'STALE';
    lastUpdate: string;
    source: string;
    workflowId: string;
    valuationUsd: number;
    txHash: string;
};

export type AuditLogEntry = {
    tag: string;
    message: string;
    status?: 'SUCCESS' | 'DONE' | 'COMPLETED';
};

export const MOCK_ORACLE: OracleVerification = {
    status: 'VERIFIED',
    lastUpdate: new Date().toISOString(),
    source: 'Official Land Registry & Certified Appraisers via CRE',
    workflowId: 'rwa_puebla_val_42',
    valuationUsd: 6_100_000,
    txHash: '0x4f12a8c9...92dc',
};

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
    { tag: 'SYSTEM', message: 'Initializing Chainlink Runtime Environment (CRE) Workflow...' },
    { tag: 'AUTH', message: 'Team FIDUCCI Credentials Authenticated.' },
    { tag: 'CRE-ID', message: 'Execution Started: wf_puebla_genesis_20ha_001' },
    { tag: 'FETCH', message: 'Connecting to Puebla State Land Registry API...' },
    { tag: 'DATA', message: 'Legal Deed #77421-B Status: "VIGENTE - NO LIENS FOUND"' },
    { tag: 'FETCH', message: 'Querying Third-Party Commercial Appraisal Engine...' },
    { tag: 'VERIFY', message: 'Validating Surveyor Hash: 0x8a2f...e91b', status: 'SUCCESS' },
    { tag: 'PROCESS', message: 'Normalizing valuation data for 200,000 sqm development site...' },
    { tag: 'COMPUTE', message: 'Calculating Parity Value: $6,100,000.00 USD' },
    { tag: 'SYNC', message: 'Pushing Verified Data to Arbitrum Stylus Smart Contract...' },
    { tag: 'TX-HASH', message: '0x4f12...92dc' },
    { tag: 'STATUS', message: 'ON-CHAIN TRUTH UPDATED SUCCESSFULLY.' },
];
