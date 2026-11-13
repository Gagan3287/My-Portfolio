export const SITE_URL = 'https://vengala-gagan.vercel.app';
export const PERSON_NAME = 'Vengala Gagan Chandra Tej';


export type Profile = { name: string; url: string };

export const PROFILES: Profile[] = [
    { name: 'GitHub', url: 'https://github.com/Gagan3287' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vengala-gagan-176a9433a/' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Vengala_Gagan/' },
    { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/profile/2403a5tyu3' },
    { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=zWMaXuMAAAAJ&hl=en' },
    { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Gagan-Vengala' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/vengalagagan' },
    { name: 'Instagram', url: 'https://www.instagram.com/gagan_vengala/' },
].filter((p) => p.url);