from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class QuestionAnswer(BaseModel):
    factor: Optional[str] = None
    questionKey: Optional[str] = None
    id: Optional[str] = None
    answerKey: Optional[Any] = None
    score: Optional[int] = None


class DiagnosticSubmission(BaseModel):
    businessId: Optional[str] = None
    stage: Optional[str] = "EARLY_TRACTION"
    brandName: Optional[str] = "My D2C Brand"
    responses: List[QuestionAnswer] = []


class FactorEvidence(BaseModel):
    question: str
    key: str
    score: int
    maxScore: int = 100


class FactorScoreDetail(BaseModel):
    score: int
    weight: float
    contribution: float
    status: str
    confidence: str = "MEDIUM"


class TopGap(BaseModel):
    factor: str
    category: str
    dimension: str
    score: int
    priority: str
    recommendation: str


class NextBestAction(BaseModel):
    title: str
    priority: str
    reason: str
    effort: str
    action: str


class DiagnosticResultResponse(BaseModel):
    id: Optional[str] = None
    scoringVersion: str = "v1"
    stage: str
    overallScore: int
    confidence: str
    confidenceReason: str
    factorScores: Dict[str, FactorScoreDetail]
    categoryScores: Dict[str, int]
    topGaps: List[TopGap]
    nextBestAction: NextBestAction
    completedAt: Optional[str] = None


class FactorExplanationResponse(BaseModel):
    factor: str
    score: int
    status: str
    confidence: str
    evidence: List[FactorEvidence]
