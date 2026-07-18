//
// Created by Adrian Frąckowiak on 18/07/2026.
//

#include "board/bitboard.h"

#include <catch2/catch_test_macros.hpp>

namespace {
constexpr int kA1 = 0;
constexpr int kH1 = 7;
constexpr int kD4 = 27;
constexpr int kH8 = 63;
}  // namespace

TEST_CASE("SetBit sets exactly one bit and leaves the rest zero", "[bitboard]") {
    SECTION("square a1 (bit 0)") {
        U64 b = SetBit(0ULL, kA1);
        REQUIRE(b == 0x1ULL);
        REQUIRE(CountBits(b) == 1);
    }

    SECTION("square d4 (bit 27, an interior square)") {
        U64 b = SetBit(0ULL, kD4);
        REQUIRE(b == (1ULL << kD4));
        REQUIRE(CountBits(b) == 1);
    }

    SECTION("square h8 (bit 63, the top edge case)") {
        U64 b = SetBit(0ULL, kH8);
        REQUIRE(b == (1ULL << 63));
        REQUIRE(CountBits(b) == 1);
    }
}

TEST_CASE("ClearBit removes exactly one bit from a multi-bit board", "[bitboard]") {
    const U64 original = SetBit(SetBit(SetBit(0ULL, kA1), kD4), kH8);
    REQUIRE(CountBits(original) == 3);

    const U64 cleared = ClearBit(original, kD4);

    REQUIRE(CountBits(cleared) == 2);
    REQUIRE((cleared & (1ULL << kD4)) == 0ULL);
    REQUIRE((cleared & (1ULL << kA1)) != 0ULL);
    REQUIRE((cleared & (1ULL << kH8)) != 0ULL);
}

TEST_CASE("CountBits counts empty, full, and known partial bitboards", "[bitboard]") {
    REQUIRE(CountBits(0ULL) == 0);
    REQUIRE(CountBits(~0ULL) == 64);
    REQUIRE(CountBits(kRank1Bb) == 8);
    REQUIRE(CountBits(kFileABb) == 8);
}

TEST_CASE("GetLsbIndex finds the least significant set bit", "[bitboard]") {
    SECTION("only bit 0 set") { REQUIRE(GetLsbIndex(1ULL) == kA1); }

    SECTION("only bit 63 set") { REQUIRE(GetLsbIndex(1ULL << 63) == kH8); }

    SECTION("multiple bits set, lowest one wins") {
        const U64 b = (1ULL << kD4) | (1ULL << kH8);
        REQUIRE(GetLsbIndex(b) == kD4);
    }

    SECTION("two adjacent low bits") {
        const U64 b = (1ULL << kA1) | (1ULL << kH1);
        REQUIRE(GetLsbIndex(b) == kA1);
    }
}

TEST_CASE("file and rank masks have exactly 8 bits and don't wrongly overlap", "[bitboard]") {
    REQUIRE(CountBits(kFileABb) == 8);
    REQUIRE(CountBits(kFileHBb) == 8);
    REQUIRE(CountBits(kRank1Bb) == 8);
    REQUIRE(CountBits(kRank8Bb) == 8);

    SECTION("distinct files don't share any square") { REQUIRE((kFileABb & kFileHBb) == 0ULL); }

    SECTION("distinct ranks don't share any square") { REQUIRE((kRank1Bb & kRank8Bb) == 0ULL); }

    SECTION("a file and a rank legitimately share exactly one square") {
        REQUIRE(CountBits(kFileABb & kRank1Bb) == 1);
        REQUIRE(CountBits(kFileHBb & kRank8Bb) == 1);
    }
}
