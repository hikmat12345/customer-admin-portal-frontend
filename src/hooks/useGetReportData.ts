import {
  postF12Report,
  postF15Report,
  postF1Report,
  postF3Report,
  postF4Report,
  postF5Report,
  postF6Report,
  postF7Report,
  postI10Report,
  postI11Report,
  postI2Report,
  postI4Report,
  postI5Report,
  postI8Report,
  postS1Report,
  postS2Report,
  postS4Report,
  postS5Report,
  postS6Report,
} from '@/services/reports/reportService';
import { createMutationWithVariables } from '@/utils/query';

export const { useMutation: usePostF1Report } = createMutationWithVariables('post-f1-report', postF1Report);

export const { useMutation: usePostF3Report } = createMutationWithVariables('post-f3-report', postF3Report);

export const { useMutation: usePostF4Report } = createMutationWithVariables('post-f4-report', postF4Report);

export const { useMutation: usePostF5Report } = createMutationWithVariables('post-f5-report', postF5Report);

export const { useMutation: usePostF6Report } = createMutationWithVariables('post-f6-report', postF6Report);

export const { useMutation: usePostF7Report } = createMutationWithVariables('post-f7-report', postF7Report);

export const { useMutation: usePostF12Report } = createMutationWithVariables('post-f12-report', postF12Report);

export const { useMutation: usePostF15Report } = createMutationWithVariables('post-f15-report', postF15Report);

export const { useMutation: usePostI2Report } = createMutationWithVariables('post-i2-report', postI2Report);

export const { useMutation: usePostI4Report } = createMutationWithVariables('post-i4-report', postI4Report);

export const { useMutation: usePostI8Report } = createMutationWithVariables('post-i8-report', postI8Report);

export const { useMutation: usePostI11Report } = createMutationWithVariables('post-i11-report', postI11Report);

export const { useMutation: usePostI5Report } = createMutationWithVariables('post-i5-report', postI5Report);

export const { useMutation: usePostI10Report } = createMutationWithVariables('post-i10-report', postI10Report);

export const { useMutation: usePostS1Report } = createMutationWithVariables('post-s1-report', postS1Report);

export const { useMutation: usePostS2Report } = createMutationWithVariables('post-s2-report', postS2Report);

export const { useMutation: usePostS4Report } = createMutationWithVariables('post-s4-report', postS4Report);

export const { useMutation: usePostS5Report } = createMutationWithVariables('post-s5-report', postS5Report);

export const { useMutation: usePostS6Report } = createMutationWithVariables('post-s6-report', postS6Report);
