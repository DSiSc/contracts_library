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

import "./lib/BaseERC777Token.sol";


contract BaseGravyToken is BaseERC777Token {
    using SafeMath for uint256;

    address public channel;
    uint256 public mintRate;

    /* -- Constructor -- */
    //
    /// @notice Constructor to create a ReferenceToken
    /// @param _name Name of the new token
    /// @param _symbol Symbol of the new token.
    /// @param _granularity Minimum transferable chunk.
    /// @param _channel Address of the payment channel contract associated with this gravy token
    /// @param _mintRate Amount of tokens to mint from the channel messages data
    function BaseGravyToken(
        string _name,
        string _symbol,
        uint256 _granularity,
        address _channel,
        uint256 _mintRate
    ) internal BaseERC777Token(_name, _symbol, _granularity) {
        channel = _channel;
        mintRate = _mintRate;
    }

    function setChannel(address _newChannel) public onlyOwner { channel = _newChannel; }

    function setMintRate(uint256 _newMintRate) public onlyOwner { mintRate = _newMintRate; }
}
