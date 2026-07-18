//
// Created by Adrian Frąckowiak on 18/07/2026.
//

#include "bitboard.h"

#include <bit>
#include <cassert>

namespace {
U64 white_pawns = 0x000000000000FF00ULL;
U64 white_knights = 0x0000000000000042ULL;
U64 white_bishops = 0x0000000000000024ULL;
U64 white_rooks = 0x0000000000000081ULL;
U64 white_queen = 0x0000000000000008ULL;
U64 white_king = 0x0000000000000010ULL;

U64 black_pawns = 0x00FF000000000000ULL;
U64 black_knights = 0x4200000000000000ULL;
U64 black_bishops = 0x2400000000000000ULL;
U64 black_rooks = 0x8100000000000000ULL;
U64 black_queen = 0x0800000000000000ULL;
U64 black_king = 0x1000000000000000ULL;

U64 all_white =
    white_pawns | white_knights | white_bishops | white_rooks | white_queen | white_king;
U64 all_black =
    black_pawns | black_knights | black_bishops | black_rooks | black_queen | black_king;
U64 occupied = all_white | all_black;
U64 empty_squares = ~occupied;
}  // namespace

U64 SetBit(U64 b, const int square) {
    assert(square >= 0 && square < 64);
    b |= (1ULL << square);
    return b;
}

U64 ClearBit(U64 b, const int square) {
    assert(square >= 0 && square < 64);
    b &= ~(1ULL << square);
    return b;
}

int CountBits(const U64 b) { return std::popcount(b); }

int GetLsbIndex(const U64 b) {
    assert(b != 0);
    return std::countr_zero(b);
}

void RecomputeAggregates() {
    all_white =
        white_pawns | white_knights | white_bishops | white_rooks | white_queen | white_king;
    all_black =
        black_pawns | black_knights | black_bishops | black_rooks | black_queen | black_king;
    occupied = all_white | all_black;
    empty_squares = ~occupied;
}
