/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Source {
  name: string;
}

export interface Artigo {
  title: string;
  description: string;
  content?: string;
  url: string;
  image: string;
  publishedAt: string;
  source: Source;
}

export interface Database {
  artigos: Artigo[];
}
