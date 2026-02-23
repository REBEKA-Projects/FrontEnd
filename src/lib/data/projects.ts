export interface ProjectItem {
    id: string; // The slug (e.g., 'genesis-puebla')
    title: string;
    location: {
        short: string;
        full: string;
        coordinates: string;
    };
    specs: {
        area: string;
        type: string;
        pricePerToken: number;
        totalValue: string;
    };
    thesis: {
        description: string;
        acquisitionCost: string;
        spreadFunction: string;
    };
    legal: {
        documentName: string;
        fiduciary: string;
        folio: string;
        notary: string;
    };
    tokenomics: {
        ticker: string;
        parity: string;
        supply: string;
        distribution: {
            owner: string;
            core: string;
            allies: string;
            reserve: string;
        };
    };
    exitStrategy: {
        model: string;
        horizon: string;
        forcedExit: string;
    };
    imageUrl: string;
    mapUrl: string;
    status: 'funding' | 'funded' | 'completed';
    progress: number;
}

export const projectsData: ProjectItem[] = [
    {
        id: 'genesis-puebla',
        title: 'Genesis Puebla',
        status: 'funding',
        progress: 65,
        imageUrl: '/assets/genesis-puebla.jpg',
        mapUrl: '/assets/mapa-genesis.jpg',
        location: {
            short: 'Puebla, MEXICO',
            full: 'Techachalco, Puebla, Mexico (Zip 73998)',
            coordinates: 'Lat 18.962399, Lon -98.194782'
        },
        specs: {
            area: '200,000 m² (20 Hectares)',
            type: 'Land / Territorial Reserve (Mixed Use)',
            pricePerToken: 30.00,
            totalValue: '$6,000,000.00 USD'
        },
        thesis: {
            description: 'Capital appreciation in a strategic growth zone, offering a tangible store of value against crypto market volatility.',
            acquisitionCost: '$500.00 MXN per m²',
            spreadFunction: 'The difference between the peso-based acquisition cost and the dollar-based issuance constitutes the operating capital. This margin funds infrastructure, commercialization, and reserves without exceeding the local commercial retail value (estimated between $1,200 and $3,000 MXN).'
        },
        legal: {
            documentName: 'Management and Transfer of Ownership Trust No. F/4892-8',
            fiduciary: 'Banco Inmobiliario Mexicano (BIM). Fiduciary Division.',
            folio: 'No. 0084519 (Public Property Registry of the State of Puebla)',
            notary: 'Public Deed No. 54,210, Volume 1,204. Public Notary Office No. 14, Puebla Judicial District.'
        },
        tokenomics: {
            ticker: '$RBEK-Chiq',
            parity: '1 $RBEK-Chiq = 1 m² of Land',
            supply: '200,000 tokens',
            distribution: {
                owner: '85.87% - Owner Liquidity Pool (Direct land acquisition)',
                core: '6.00% - REBEKA Core Team',
                allies: '3.00% - Partner Program',
                reserve: '5.13% - Operating Reserve (10-Year All-Inclusive)'
            }
        },
        exitStrategy: {
            model: 'Exit/Liquidation Strategy (Appreciation). Capitalizing on land value growth.',
            horizon: '3 to 5 recommended years',
            forcedExit: 'If the asset has not been liquidated after 10 years, an irrevocable instruction triggers a market sale and pro-rata distribution.'
        }
    }
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
    return projectsData.find(p => p.id === slug);
}
