//
// Created by Adrian Frąckowiak on 18/07/2026.
//

#ifndef GOCHESSPLUSPLUS_ENGINE_BITBOARD_H
#define GOCHESSPLUSPLUS_ENGINE_BITBOARD_H

#include <cstdint>

typedef uint64_t U64;

[[nodiscard]] U64 SetBit(U64 b, int square);
[[nodiscard]] U64 ClearBit(U64 b, int square);
int CountBits(U64 b);
int GetLsbIndex(U64 b);

void RecomputeAggregates();

inline constexpr U64 kFileABb = 0x0101010101010101ULL;
inline constexpr U64 kFileHBb = kFileABb << 7;
inline constexpr U64 kRank1Bb = 0x00000000000000FFULL;
inline constexpr U64 kRank8Bb = kRank1Bb << 56;

#endif  // GOCHESSPLUSPLUS_ENGINE_BITBOARD_H
