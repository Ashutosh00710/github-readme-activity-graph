export type Metric = 'contributions' | 'commits';

export class Query {
    query: string;
    variables: {
        LOGIN: string;
        [key: string]: unknown;
    };
}

export class Colors {
    areaColor: string;
    bgColor: string;
    borderColor: string;
    color: string;
    titleColor: string;
    lineColor: string;
    pointColor: string;
}

export class QueryOption {
    username: string;
    hide_title?: boolean;
    custom_title?: string;
    from?: string;
    to?: string;
    grid: boolean;
    colors: Colors;
    area: boolean;
    radius: number;
    height: number;
    days: number;
    metric: Metric;
}

export class ParsedQs {
    username?: string;
    hide_title?: boolean;
    custom_title?: string;
    bg_color?: string;
    border_color?: string;
    hide_border?: boolean;
    area_color?: string;
    color?: string;
    line?: string;
    point?: string;
    theme?: string;
    area?: boolean;
    radius?: number;
    title_color?: string;
    height?: number;
    days?: string;
    from?: string;
    to?: string;
    grid?: string;
    metric?: string;
}

export class GraphArgs {
    height: number;
    width: number;
    colors: Colors;
    title: string;
    radius: number;
    line: string;
}

export class UserDetails {
    contributions: Array<ContributionDay>;
    name: string;
}

export class ContributionDay {
    contributionCount: number;
    date: string;
}

export class Week {
    contributionDays: Array<ContributionDay>;
}

export class ResponseOfApi {
    data?: {
        user: {
            name: string;
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: Array<Week>;
                };
            };
        };
    };
    errors?: Array<{ message: string; type: string }>;
}

export class CommitHistoryNode {
    oid: string;
    committedDate: string;
}

export class BranchNode {
    target: {
        history?: {
            nodes: Array<CommitHistoryNode>;
            pageInfo: { hasNextPage: boolean };
        };
    } | null;
}

export class RepositoryNode {
    nameWithOwner: string;
    pushedAt: string | null;
    refs: { nodes: Array<BranchNode> } | null;
}

export class CommitsResponse {
    data?: {
        user: {
            repositories: { nodes: Array<RepositoryNode> };
        } | null;
    };
    errors?: Array<{ message: string; type: string }>;
}

export class UserIdResponse {
    data?: {
        user: { id: string; name: string | null } | null;
    };
    errors?: Array<{ message: string; type: string }>;
}
