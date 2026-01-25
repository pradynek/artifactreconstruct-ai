
export interface Hotspot {
  x: number;
  y: number;
  label: string;
  detail: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ArtifactAnalysis {
  identification: {
    type: string;
    era: string;
    civilization: string;
    region: string;
    material: string;
    exactYearRange: string;
  };
  damageAnalysis: {
    description: string;
    missingSections: string;
  };
  pastReconstruction: {
    description: string;
    visualPrompt: string;
    hotspots: Hotspot[];
  };
  modernRestoration: {
    description: string;
    visualPrompt: string;
  };
  timeline: TimelineEvent[];
  confidenceScore: number;
  confidenceExplanation: string;
  assumptions: string;
  curatorNarrative: string;
  sources: GroundingSource[];
}

export type AppStatus = 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';

export interface ReconstructionData {
  analysis: ArtifactAnalysis | null;
  pastImage: string | null;
  presentImage: string | null;
  originalImage: string | null;
  audioBlob?: string | null;
}
