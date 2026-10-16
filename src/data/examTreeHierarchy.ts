export type TreeExamId = 'mpsc' | 'upsc' | 'ssc' | 'rrb';

export interface ExamTreeNode {
  nodeId: string;
  examId: TreeExamId;
  label: string;
  marathiLabel: string;
  color: 'teal' | 'terracotta' | 'navy';
  parentId?: string;
  childGroupLabel?: string;
  childGroupMarathiLabel?: string;
  children?: ExamTreeNode[];
}

export const EXAM_TREE_HIERARCHY: Record<TreeExamId, ExamTreeNode> = {
  mpsc: {
    nodeId: 'mpsc-root',
    examId: 'mpsc',
    label: 'MPSC',
    marathiLabel: 'MPSC (महाराष्ट्र लोकसेवा आयोग)',
    color: 'navy',
    childGroupLabel: 'Main Exam Categories',
    childGroupMarathiLabel: 'मुख्य परीक्षा विभाग',
    children: [
      {
        nodeId: 'mpsc-gazetted',
        examId: 'mpsc',
        parentId: 'mpsc-root',
        label: 'Gazetted Group A & Group B',
        marathiLabel: 'राजपत्रित गट-अ व गट-ब (राज्यसेवा)',
        color: 'teal',
        childGroupLabel: 'Select Section',
        childGroupMarathiLabel: 'पुढील पर्याय निवडा',
        children: [
          {
            nodeId: 'mpsc-gazetted-syllabus',
            examId: 'mpsc',
            parentId: 'mpsc-gazetted',
            label: 'Syllabus',
            marathiLabel: 'Syllabus (अभ्यासक्रम)',
            color: 'teal',
          },
          {
            nodeId: 'mpsc-gazetted-post',
            examId: 'mpsc',
            parentId: 'mpsc-gazetted',
            label: 'Post',
            marathiLabel: 'Post (पदे)',
            color: 'teal',
          },
          {
            nodeId: 'mpsc-gazetted-pattern',
            examId: 'mpsc',
            parentId: 'mpsc-gazetted',
            label: 'Exam Pattern',
            marathiLabel: 'Exam Pattern (परीक्षा स्वरूप)',
            color: 'teal',
            childGroupLabel: 'Pattern Stages',
            childGroupMarathiLabel: 'Pattern Stages (परीक्षेचे टप्पे)',
            children: [
              {
                nodeId: 'mpsc-gazetted-prelims',
                examId: 'mpsc',
                parentId: 'mpsc-gazetted-pattern',
                label: 'Prelims',
                marathiLabel: 'Prelims (पूर्व परीक्षा)',
                color: 'teal',
                childGroupLabel: 'Prelims Papers',
                childGroupMarathiLabel: 'पूर्व परीक्षा पेपर्स',
                children: [
                  {
                    nodeId: 'mpsc-gazetted-gs1',
                    examId: 'mpsc',
                    parentId: 'mpsc-gazetted-prelims',
                    label: 'GS-I',
                    marathiLabel: 'GS-I (सामान्य अध्ययन पेपर-१)',
                    color: 'teal',
                  },
                  {
                    nodeId: 'mpsc-gazetted-csat',
                    examId: 'mpsc',
                    parentId: 'mpsc-gazetted-prelims',
                    label: 'CSAT',
                    marathiLabel: 'CSAT (सीसॅट पेपर-२)',
                    color: 'teal',
                  },
                ],
              },
              {
                nodeId: 'mpsc-gazetted-mains',
                examId: 'mpsc',
                parentId: 'mpsc-gazetted-pattern',
                label: 'Mains',
                marathiLabel: 'Mains (मुख्य परीक्षा)',
                color: 'teal',
              },
              {
                nodeId: 'mpsc-gazetted-interview',
                examId: 'mpsc',
                parentId: 'mpsc-gazetted-pattern',
                label: 'Interview',
                marathiLabel: 'Interview (मुलाखत)',
                color: 'teal',
              },
            ],
          },
        ],
      },
      {
        nodeId: 'mpsc-nongazetted',
        examId: 'mpsc',
        parentId: 'mpsc-root',
        label: 'Non-Gazetted Group B & C',
        marathiLabel: 'अराजपत्रित स्वतंत्र गट-ब व गट-क',
        color: 'terracotta',
        childGroupLabel: 'Select Section',
        childGroupMarathiLabel: 'पुढील पर्याय निवडा',
        children: [
          {
            nodeId: 'mpsc-nongazetted-syllabus',
            examId: 'mpsc',
            parentId: 'mpsc-nongazetted',
            label: 'Syllabus',
            marathiLabel: 'Syllabus (अभ्यासक्रम)',
            color: 'terracotta',
          },
          {
            nodeId: 'mpsc-nongazetted-post',
            examId: 'mpsc',
            parentId: 'mpsc-nongazetted',
            label: 'Post',
            marathiLabel: 'Post (पदे)',
            color: 'terracotta',
          },
          {
            nodeId: 'mpsc-nongazetted-pattern',
            examId: 'mpsc',
            parentId: 'mpsc-nongazetted',
            label: 'Pattern',
            marathiLabel: 'Pattern (परीक्षा पद्धत)',
            color: 'terracotta',
            childGroupLabel: 'Pattern Stages',
            childGroupMarathiLabel: 'Pattern Stages (परीक्षेचे टप्पे)',
            children: [
              {
                nodeId: 'mpsc-nongazetted-prelims',
                examId: 'mpsc',
                parentId: 'mpsc-nongazetted-pattern',
                label: 'Prelim',
                marathiLabel: 'Prelim (पूर्व परीक्षा)',
                color: 'terracotta',
              },
              {
                nodeId: 'mpsc-nongazetted-mains',
                examId: 'mpsc',
                parentId: 'mpsc-nongazetted-pattern',
                label: 'Main',
                marathiLabel: 'Main (मुख्य परीक्षा)',
                color: 'terracotta',
              },
            ],
          },
        ],
      },
    ],
  },

  upsc: {
    nodeId: 'upsc-root',
    examId: 'upsc',
    label: 'UPSC',
    marathiLabel: 'UPSC (केंद्रीय लोकसेवा आयोग)',
    color: 'terracotta',
    childGroupLabel: 'Select Section',
    childGroupMarathiLabel: 'पुढील पर्याय निवडा',
    children: [
      {
        nodeId: 'upsc-syllabus',
        examId: 'upsc',
        parentId: 'upsc-root',
        label: 'Syllabus',
        marathiLabel: 'Syllabus (अभ्यासक्रम)',
        color: 'terracotta',
      },
      {
        nodeId: 'upsc-pattern',
        examId: 'upsc',
        parentId: 'upsc-root',
        label: 'Pattern / Stages',
        marathiLabel: 'Pattern / Stages (परीक्षा स्वरूप)',
        color: 'terracotta',
        childGroupLabel: 'Pattern Stages',
        childGroupMarathiLabel: 'Pattern Stages (परीक्षेचे टप्पे)',
        children: [
          {
            nodeId: 'upsc-prelims',
            examId: 'upsc',
            parentId: 'upsc-pattern',
            label: 'Prelims',
            marathiLabel: 'Prelims (पूर्व परीक्षा)',
            color: 'terracotta',
          },
          {
            nodeId: 'upsc-mains',
            examId: 'upsc',
            parentId: 'upsc-pattern',
            label: 'Mains',
            marathiLabel: 'Mains (मुख्य परीक्षा)',
            color: 'terracotta',
          },
          {
            nodeId: 'upsc-interview',
            examId: 'upsc',
            parentId: 'upsc-pattern',
            label: 'Interview',
            marathiLabel: 'Interview (मुलाखत)',
            color: 'terracotta',
          },
        ],
      },
      {
        nodeId: 'upsc-posts',
        examId: 'upsc',
        parentId: 'upsc-root',
        label: 'Posts',
        marathiLabel: 'Posts (पदे)',
        color: 'terracotta',
      },
    ],
  },

  ssc: {
    nodeId: 'ssc-root',
    examId: 'ssc',
    label: 'SSC',
    marathiLabel: 'SSC (कर्मचारी निवड आयोग)',
    color: 'terracotta',
    childGroupLabel: 'Select Section',
    childGroupMarathiLabel: 'पुढील पर्याय निवडा',
    children: [
      {
        nodeId: 'ssc-syllabus',
        examId: 'ssc',
        parentId: 'ssc-root',
        label: 'Syllabus',
        marathiLabel: 'Syllabus (अभ्यासक्रम)',
        color: 'terracotta',
      },
      {
        nodeId: 'ssc-pattern',
        examId: 'ssc',
        parentId: 'ssc-root',
        label: 'Pattern / Stages',
        marathiLabel: 'Pattern / Stages (परीक्षा स्वरूप)',
        color: 'terracotta',
        childGroupLabel: 'Pattern Stages',
        childGroupMarathiLabel: 'Pattern Stages (परीक्षेचे टप्पे)',
        children: [
          {
            nodeId: 'ssc-tier1',
            examId: 'ssc',
            parentId: 'ssc-pattern',
            label: 'Tier-I (CBT)',
            marathiLabel: 'Tier-I (CBT) (टियर-१)',
            color: 'terracotta',
          },
          {
            nodeId: 'ssc-tier2',
            examId: 'ssc',
            parentId: 'ssc-pattern',
            label: 'Tier-II (CBT)',
            marathiLabel: 'Tier-II (CBT) (टियर-२)',
            color: 'terracotta',
          },
          {
            nodeId: 'ssc-skill',
            examId: 'ssc',
            parentId: 'ssc-pattern',
            label: 'Skill Test',
            marathiLabel: 'Skill Test (कौशल्य चाचणी)',
            color: 'terracotta',
          },
        ],
      },
      {
        nodeId: 'ssc-posts',
        examId: 'ssc',
        parentId: 'ssc-root',
        label: 'Posts',
        marathiLabel: 'Posts (पदे)',
        color: 'terracotta',
      },
      {
        nodeId: 'ssc-language',
        examId: 'ssc',
        parentId: 'ssc-root',
        label: 'Language of Examination',
        marathiLabel: 'Language of Examination (परीक्षेची भाषा)',
        color: 'terracotta',
      },
    ],
  },

  rrb: {
    nodeId: 'rrb-root',
    examId: 'rrb',
    label: 'RRB',
    marathiLabel: 'RRB (रेल्वे भरती मंडळ)',
    color: 'terracotta',
    childGroupLabel: 'Select Section',
    childGroupMarathiLabel: 'पुढील पर्याय निवडा',
    children: [
      {
        nodeId: 'rrb-syllabus',
        examId: 'rrb',
        parentId: 'rrb-root',
        label: 'Syllabus',
        marathiLabel: 'Syllabus (अभ्यासक्रम)',
        color: 'terracotta',
      },
      {
        nodeId: 'rrb-pattern',
        examId: 'rrb',
        parentId: 'rrb-root',
        label: 'Pattern / Stages',
        marathiLabel: 'Pattern / Stages (परीक्षा स्वरूप)',
        color: 'terracotta',
        childGroupLabel: 'Pattern Stages',
        childGroupMarathiLabel: 'Pattern Stages (परीक्षेचे टप्पे)',
        children: [
          {
            nodeId: 'rrb-cbt1',
            examId: 'rrb',
            parentId: 'rrb-pattern',
            label: 'CBT-1',
            marathiLabel: 'CBT-1 (सीबीटी-१)',
            color: 'terracotta',
          },
          {
            nodeId: 'rrb-cbt2',
            examId: 'rrb',
            parentId: 'rrb-pattern',
            label: 'CBT-2',
            marathiLabel: 'CBT-2 (सीबीटी-२)',
            color: 'terracotta',
          },
          {
            nodeId: 'rrb-cbat',
            examId: 'rrb',
            parentId: 'rrb-pattern',
            label: 'CBAT',
            marathiLabel: 'CBAT (कौशल्य / सायको चाचणी)',
            color: 'terracotta',
          },
        ],
      },
      {
        nodeId: 'rrb-posts',
        examId: 'rrb',
        parentId: 'rrb-root',
        label: 'Posts',
        marathiLabel: 'Posts (पदे)',
        color: 'terracotta',
      },
    ],
  },
};

export function findExamTreeNode(examId: TreeExamId, nodeId: string): ExamTreeNode | null {
  const root = EXAM_TREE_HIERARCHY[examId];
  if (!root) return null;

  const queue: ExamTreeNode[] = [root];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.nodeId === nodeId) {
      return current;
    }
    if (current.children) {
      queue.push(...current.children);
    }
  }
  return null;
}

export function getExamNodeBreadcrumbPath(examId: TreeExamId, nodeId: string): ExamTreeNode[] {
  const path: ExamTreeNode[] = [];
  let current = findExamTreeNode(examId, nodeId);
  while (current) {
    path.unshift(current);
    if (current.parentId) {
      current = findExamTreeNode(examId, current.parentId);
    } else {
      break;
    }
  }
  return path;
}
