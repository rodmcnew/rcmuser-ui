<?php

namespace RcmUser\Ui\Controller\Plugin;

use RcmUser\Acl\Service\AuthorizeService;
use RcmUser\Authentication\Service\UserAuthenticationService;
use RcmUser\User\Entity\User;
use Zend\Mvc\Controller\Plugin\AbstractPlugin;

/**
 * @deprecated Use RcmUserService->hasRoleBasedAccess()
 * RcmUserHasRoleBasedAccess
 *
 * RcmUserHasRoleBasedAccess
 *
 * PHP version 5
 *
 * @category  Reliv
 * @package   RcmUser\Ui\Controller\Plugin
 * @author    James Jervis <jjervis@relivinc.com>
 * @copyright 2014 Reliv International
 * @license   License.txt New BSD License
 * @version   Release: <package_version>
 * @link      https://github.com/reliv
 */
class RcmUserHasRoleBasedAccess extends AbstractPlugin
{

    /**
     * @var AuthorizeService $authorizeService
     */
    protected $authorizeService;

    /**
     * @var UserAuthenticationService $userAuthService
     */
    protected $userAuthService;

    /**
     * __construct
     *
     * @param AuthorizeService          $authorizeService authorizeService
     * @param UserAuthenticationService $userAuthService  userAuthService
     */
    public function __construct(
        AuthorizeService $authorizeService,
        UserAuthenticationService $userAuthService
    ) {
        $this->authorizeService = $authorizeService;
        $this->userAuthService = $userAuthService;
    }

    /**
     * @deprecated Use RcmUserService->hasRoleBasedAccess()
     * __invoke
     *
     * @param $roleId
     *
     * @return bool
     */
    public function __invoke(
        $roleId
    ) {
        $user = $this->userAuthService->getIdentity();

        if (!($user instanceof User)) {
            return false;
        }

        return $this->authorizeService->hasRoleBasedAccess($user, $roleId);
    }
}
