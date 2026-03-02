import { homeHeroContent } from './homeHero.service';
import { homeProcessContent } from './homeProcess.service';
import { homePortfolioContent } from './homePortfolio.service';
import { homeContactContent } from './homeContact.service';
import { homeFaqContent } from './homeFaq.service';

export const homeLandingContent = {
    hero: homeHeroContent,
    process: homeProcessContent,
    portfolio: homePortfolioContent,
    contact: homeContactContent,
    faq: homeFaqContent
};

export function getHomeLandingContent() {
    return homeLandingContent;
}
