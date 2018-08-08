/*  This file is part of channel-gravy-token.
 *
 *  channel-gravy-token is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or (at your
 *  option) any later version.
 *
 *  channel-gravy-token is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
 *  License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with channel-gravy-token.  If not, see <http://www.gnu.org/licenses/>.
*/
pragma solidity 0.4.19;


library CastUtils {
    function toAsciiString(address x) internal pure returns (string) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(byte b) internal pure returns (byte c) {
        return (b < 10) ? byte(uint8(b) + 0x30) : byte(uint8(b) + 0x57);
    }

}
